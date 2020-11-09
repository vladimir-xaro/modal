import { I_Modal, I_ModalConfig, I_ModalConstructorConfig, I_ModalDisplayConfig } from "./types";
import EventEmitter, { I_EventEmitter } from "@xaro/event-emitter";
import extend from "@xaro/extend";

const defaults = {
  el:       null,
  dom: {
    backdrop:   null,
    container:  null
  },
  visible:  false,
  animate:  true,
  allow: {
    closeEsc:         true,
    closeAttr:        true,
    animateContainer: true,
    animateBackdrop:  true
  },
  selector: {
    container:  '.modal__container',
    backdrop:   '.modal__backdrop',
    closeBtn:   '.modal__btn-close'
  },
  classes: {
    visible: 'modal--visible',
    animation: {
      cancel: 'modal-animation--cancel',
      show: {
        container:  'modal-animation-container--show',
        backdrop:   'modal-animation-backdrop--show',
      },
      hide: {
        container:  'modal-animation-container--hide',
        backdrop:   'modal-animation-backdrop--hide',
      }
    }
  },
  closeAttr: '[data-modal-close]'
}

export default class Modal implements I_Modal {
  static blurEl: Element | null = null;

  emitter:  I_EventEmitter;
  config!:  I_ModalConfig;

  pending:  boolean = false;

  animation: { container: boolean, backdrop: boolean } = {
    container:  false,
    backdrop:   false
  };

  constructor(config: I_ModalConstructorConfig) {
    this.emitter    = new EventEmitter(config.on);

    this.config     = extend(defaults, config);

    if (! this.config.dom.backdrop) {
      this.config.dom.backdrop = this.config.el.querySelector('.modal__backdrop');
    }
    if (! this.config.dom.container) {
      const containerEl = this.config.el.querySelector('.modal__container');
      
      if (! containerEl) {
        throw new Error('[Modal] Container does not exists');
      }

      this.config.dom.container = containerEl as HTMLElement;
    }

    this.__closeAttrListener              = this.__closeAttrListener.bind(this);
    this.__closeEscListener               = this.__closeEscListener.bind(this);

    if (this.config.animate) {
      this.__containerAnimationEndListener  = this.__containerAnimationEndListener.bind(this);
      this.__backdropAnimationEndListener   = this.__backdropAnimationEndListener.bind(this);

      this.config.dom.container.addEventListener('animationend', this.__containerAnimationEndListener);
      this.config.dom.backdrop?.addEventListener('animationend', this.__backdropAnimationEndListener);
    }
  }


  /** DOM Event Listeners */
  protected __closeAttrListener(event: MouseEvent): void {
    this.hide();
    this.emitter.emit('closeAttrClick', this, event);
  }


  protected __closeEscListener(event: KeyboardEvent): void {
    event.stopPropagation();

    if (event.code === 'Escape') {
      this.hide()
      this.emitter.emit('escKey', this, event);
    }
  }


  protected __containerAnimationEndListener(event: AnimationEvent): void {
    this.emitter.emit('containerAnimationEnd', this, event);
  }


  protected __backdropAnimationEndListener(event: AnimationEvent): void {
    this.emitter.emit('backdropAnimationEnd', this, event);
  }


  /** Add DOM Event Listeners */
  protected addListeners() {
    // attr
    const closeEls = this.config.el.querySelectorAll(this.config.closeAttr);
    for (const el of closeEls) {
      el.addEventListener('click', this.__closeAttrListener as EventListener);
    }
    // esc
    document.addEventListener('keyup', this.__closeEscListener);
  }


  /** Remove DOM Event Listeners */
  protected removeListeners() {
    // attr
    const closeEls = this.config.el.querySelectorAll(this.config.closeAttr);
    for (const el of closeEls) {
      el.removeEventListener('click', this.__closeAttrListener as EventListener);
    }
    // esc
    document.removeEventListener('keyup', this.__closeEscListener);
  }

  /** show/hide animation end */
  protected animationEndCallback(key1: string, key2: string, hide: boolean, event: AnimationEvent) {
    console.log('animationEndCallback', key1);
    this.animation[key1] = false;

    if (this.config.dom[key2] && this.animation[key2]) {
      return;
    }

    this.pending = false;

    if (hide) {
      this.config.el.classList.remove(this.config.classes.visible);
    }

    this.emitter.emit('after' + hide ? 'Hide' : 'Show', this, event);
  }

  get visible() {
    return this.config.visible;
  }

  set visible(newValue) {
    this.config.visible = !!newValue;
  }


  show(config?: I_ModalDisplayConfig) {
    if (this.visible) {
      return;
    }

    const el        = this.config.el;
    const container = this.config.dom.container;
    const backdrop  = this.config.dom.backdrop;

    if (this.pending) {
      container.classList.add(this.config.classes.animation.cancel);
      backdrop && backdrop.classList.add(this.config.classes.animation.cancel);
      this.emitter.unsubscribe('containerAnimationEnd', 'backdropAnimationEnd');
    }

    this.emitter.emit('beforeShow', this);

    this.visible = true;

    if (document.activeElement && document.hasFocus()) {
      Modal.blurEl = document.activeElement;
      (document.activeElement as HTMLElement).blur();
    }

    if (this.config.animate) {
      this.pending = true;

      container.classList.remove(this.config.classes.animation.hide.container, this.config.classes.animation.cancel);
      backdrop?.classList.remove(this.config.classes.animation.hide.backdrop, this.config.classes.animation.cancel);
    }
    el.classList.add(this.config.classes.visible);
    if (this.config.animate) {
      this.animation.container = true;
      container.classList.add(this.config.classes.animation.show.container);
      if (backdrop) {
        this.animation.backdrop = true;
        backdrop.classList.add(this.config.classes.animation.show.backdrop);
      }
    }

    this.addListeners();

    document.body.style.overflow  = 'hidden';
    document.body.style.height    = '100vh';

    if (this.config.animate) {
      this.emitter.once('containerAnimationEnd', event => this.animationEndCallback('container', 'backdrop', false, event));
      this.emitter.once('backdropAnimationEnd', event => this.animationEndCallback('backdrop', 'container', false, event));
    } else {
      this.emitter.emit('afterShow', this);
    }
  }


  hide(config?: I_ModalDisplayConfig) {
    if (! this.visible) {
      return;
    }

    const el        = this.config.el;
    const container = this.config.dom.container;
    const backdrop  = this.config.dom.backdrop;

    if (this.pending) {
      container.classList.add(this.config.classes.animation.cancel);
      backdrop?.classList.add(this.config.classes.animation.cancel);
      this.emitter.unsubscribe('containerAnimationEnd', 'backdropAnimationEnd');
      this.pending = false;
    }

    this.emitter.emit('beforeHide', this);
    
    this.removeListeners();
    
    this.visible = false;

    if (this.config.animate) {
      this.pending = true;
      
      this.animation.container = true;
      container.classList.remove(this.config.classes.animation.show.container, this.config.classes.animation.cancel);
      if (backdrop) {
        this.animation.backdrop = true;
        backdrop.classList.remove(this.config.classes.animation.show.backdrop, this.config.classes.animation.cancel);
        backdrop.classList.add(this.config.classes.animation.hide.backdrop);
      }
      container.classList.add(this.config.classes.animation.hide.container);
    }

    if (Modal.blurEl) {
      (Modal.blurEl as HTMLElement).focus();
    }
    Modal.blurEl = null;

    document.body.style.overflow  = '';
    document.body.style.height    = '';

    if (this.config.animate) {
      this.emitter.once('backdropAnimationEnd', event => this.animationEndCallback('backdrop', 'container', true, event));
      this.emitter.once('containerAnimationEnd', event => this.animationEndCallback('container', 'backdrop', true, event));
    } else {
      this.emitter.emit('afterHide', this);
      el.classList.remove(this.config.classes.visible);
    }
  }
}