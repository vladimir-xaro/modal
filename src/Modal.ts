import { I_Modal, I_ModalConfig, I_ModalConstructorConfig, I_ModalDisplayConfig, T_Mutation } from "./types";
import EventEmitter, { I_EventEmitter } from "@xaro/event-emitter";
import extend from "@xaro/extend";
import { defaults } from "./variables";

export default class Modal implements I_Modal {
  static blurEl:          Element | null  = null;
  static lastUndefinedId: number          = 0;

  protected pending:      boolean         = false;

  protected animation: { container: boolean, backdrop: boolean } = {
    container:  false,
    backdrop:   false
  };

  protected timeout: { container?: number, backdrop?: number } = {
    container:  undefined,
    backdrop:   undefined
  };

  emitter:  I_EventEmitter;
  config:   I_ModalConfig;


  /**
   * Create Modal
   * @param config I_ModalConstructorConfig
   */
  constructor(config: I_ModalConstructorConfig) {
    this.emitter  = new EventEmitter(config.on);
    this.config   = extend({}, defaults, config);

    if (typeof config.el === 'string') {
      this.config.el = document.querySelector(config.el) as HTMLElement;
    }

    if (! this.config.el) {
      throw new Error("Element does not exists");
    }

    if (! this.config.id) {
      this.config.id = this.config.el.getAttribute(this.config.attr.id) || 'modal-' + Modal.lastUndefinedId++;
    }

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

    if (this.config.allow.closeAttr) {
      this.__closeAttrListener              = this.__closeAttrListener.bind(this);
    }
    if (this.config.allow.closeEsc) {
      this.__closeEscListener               = this.__closeEscListener.bind(this);
    }

    if (this.config.mutations.container) {
      this.__containerMutationEndListener = this.__containerMutationEndListener.bind(this);
      this.config.dom.container.addEventListener(this.config.mutations.container + 'end', this.__containerMutationEndListener);
    }
    if (this.config.dom.backdrop && this.config.mutations.backdrop) {
      this.__backdropMutationEndListener = this.__backdropMutationEndListener.bind(this);
      this.config.dom.backdrop.addEventListener(this.config.mutations.backdrop + 'end', this.__backdropMutationEndListener);
    }

    // trigger attr
    for (const el of document.querySelectorAll(`[${this.config.attr.target}]`)) {
      if (el.getAttribute(this.config.attr.target) === this.config.id) {
        el.addEventListener('click', () => this.show());
      }
    }

    this.emitter.emit('init', this);
    
    if (this.config.visible) {
      this.show({ force: true });
    }
  }


  /** DOM close attributes Listeners */
  protected __closeAttrListener(event: MouseEvent): void {
    this.hide();
    this.emitter.emit('closeAttrClick', this, event);
  }


  /** DOM Escape listener */
  protected __closeEscListener(event: KeyboardEvent): void {
    event.stopPropagation();

    if (event.code === 'Escape') {
      this.hide()
      this.emitter.emit('escKey', this, event);
    }
  }


  /** Animation/Transition listeners */
  protected __containerMutationEndListener(event: any): void {
    this.emitter.emit('containerMutationEnd', this, event);
  }
  protected __backdropMutationEndListener(event: any): void {
    this.emitter.emit('backdropMutationEnd', this, event);
  }


  /** Add DOM Event Listeners */
  protected addListeners(): void {
    // attr
    if (this.config.allow.closeAttr) {
      const closeEls = this.config.el.querySelectorAll(`[${this.config.attr.close}]`);
      for (const el of closeEls) {
        el.addEventListener('click', this.__closeAttrListener as EventListener);
      }
    }
    // esc
    if (this.config.allow.closeEsc) {
      document.addEventListener('keyup', this.__closeEscListener);
    }
  }


  /** Remove DOM Event Listeners */
  protected removeListeners(): void {
    // attr
    if (this.config.allow.closeAttr) {
      const closeEls = this.config.el.querySelectorAll(`[${this.config.attr.close}]`);
      for (const el of closeEls) {
        el.removeEventListener('click', this.__closeAttrListener as EventListener);
      }
    }
    // esc
    if (this.config.allow.closeEsc) {
      document.removeEventListener('keyup', this.__closeEscListener);
    }
  }


  /** show/hide mutation end callback */
  protected mutationEndCallback(key1: string, key2: string, hide: boolean, event: TransitionEvent) {
    this.animation[key1] = false;

    if (this.config.dom[key2] && this.animation[key2]) {
      return;
    }
    
    this.pending = false;
    
    console.log(`[${key1}] ${hide ? 'Hide' : 'Show'}`)
    if (hide) {
      console.log('here')
      this.config.el.classList.remove(this.config.classes.visible);
    }

    this.emitter.emit('after' + hide ? 'Hide' : 'Show', this, event);
  }


  /**
   * Show modal
   * @param config I_ModalDisplayConfig
   */
  show(config?: I_ModalDisplayConfig) {
    if (this.config.visible) {
      if (! config?.force) {
        return;
      }
    }

    for (const key in this.timeout) {
      if (this.timeout[key]) {
        clearTimeout(this.timeout[key]);
      }
    }

    const el        = this.config.el;
    const container = this.config.dom.container;
    const backdrop  = this.config.dom.backdrop;

    if (this.pending) {
      if (this.config.mutations.container) {
        container.classList.add(this.config.classes[this.config.mutations.container].cancel);
      }
      if (backdrop && this.config.mutations.backdrop) {
        backdrop.classList.add(this.config.classes[this.config.mutations.backdrop].cancel);
      }
      this.emitter.unsubscribe('containerMutationEnd', 'backdropMutationEnd');
    }

    this.emitter.emit('beforeShow', this);

    this.config.visible = true;

    if (document.activeElement && document.hasFocus()) {
      Modal.blurEl = document.activeElement;
      (document.activeElement as HTMLElement).blur();
    }

    this.pending = true;
    if (this.config.mutations.container) {
      const key = this.config.mutations.container;
      container.classList.remove(this.config.classes[key].hide.container, this.config.classes[key].cancel);
    }
    if (backdrop && this.config.mutations.backdrop) {
      const key = this.config.mutations.backdrop;
      backdrop.classList.remove(this.config.classes[key].hide.backdrop, this.config.classes[key].cancel);
    }

    el.classList.add(this.config.classes.visible);

    if (this.config.mutations.container) {
      const key = this.config.mutations.container;

      this.animation.container = true;
      if (+this.config.timeout.container[key] > 0) {
        this.timeout.container = setTimeout(() => {
          container.classList.add(this.config.classes[key].show.container);
        }, this.config.timeout.container[key]);
      } else {
        container.classList.add(this.config.classes[key].show.container);
      }
    }
    if (backdrop && this.config.mutations.backdrop) {
      const key = this.config.mutations.backdrop;

      this.animation.backdrop = true;
      if (+this.config.timeout.backdrop[key] > 0) {
        this.timeout.backdrop = setTimeout(() => {
          backdrop.classList.add(this.config.classes[key].show.backdrop);
        }, this.config.timeout.backdrop[key]);
      } else {
        backdrop.classList.add(this.config.classes[key].show.backdrop);
      }
    }

    this.addListeners();

    if (! this.config.allow.bodyScroll) {
      document.body.style.overflow  = 'hidden';
      document.body.style.height    = '100vh';
    }

    if (this.config.mutations.container) {
      this.emitter.once('containerMutationEnd', event => this.mutationEndCallback('container', 'backdrop', false, event));
    }
    if (this.config.mutations.backdrop) {
      this.emitter.once('backdropMutationEnd', event => this.mutationEndCallback('backdrop', 'container', false, event));
    }
    if (!this.config.mutations.container && !this.config.mutations.backdrop) {
      this.config.el.classList.remove(this.config.classes.visible);
      this.emitter.emit('afterShow', this);
    }
  }


  /**
   * Hide modal
   * @param config I_ModalDisplayConfig
   */
  hide(config?: I_ModalDisplayConfig) {
    if (! this.config.visible) {
      if (! config?.force) {
        return;
      }
    }

    for (const key in this.timeout) {
      if (this.timeout[key]) {
        clearTimeout(this.timeout[key]);
      }
    }

    const el        = this.config.el;
    const container = this.config.dom.container;
    const backdrop  = this.config.dom.backdrop;

    if (this.pending) {
      if (this.config.mutations.container) {
        container.classList.add(this.config.classes[this.config.mutations.container].cancel);
      }
      if (backdrop && this.config.mutations.backdrop) {
        backdrop.classList.add(this.config.classes[this.config.mutations.backdrop].cancel);
      }
      this.emitter.unsubscribe('containerMutationEnd', 'backdropMutationEnd');
    }

    this.emitter.emit('beforeHide', this);
    
    this.removeListeners();
    
    this.config.visible = false;

    this.pending = true;
    if (this.config.mutations.container) {
      const key = this.config.mutations.container;
      this.animation.container = true;
      container.classList.remove(this.config.classes[key].show.container, this.config.classes[key].cancel);
      container.classList.add(this.config.classes[key].hide.container);
    }
    if (backdrop && this.config.mutations.backdrop) {
      const key = this.config.mutations.backdrop;
      this.animation.backdrop = true;
      backdrop.classList.remove(this.config.classes[key].show.backdrop, this.config.classes[key].cancel);
      backdrop.classList.add(this.config.classes[key].hide.backdrop);
    }

    if (Modal.blurEl) {
      (Modal.blurEl as HTMLElement).focus();
    }
    Modal.blurEl = null;

    if (! this.config.allow.bodyScroll) {
      document.body.style.overflow  = '';
      document.body.style.height    = '';
    }

    if (this.config.mutations.container) {
      this.emitter.once('containerMutationEnd', event => this.mutationEndCallback('container', 'backdrop', true, event));
    }
    if (this.config.mutations.backdrop) {
      this.emitter.once('backdropMutationEnd', event => this.mutationEndCallback('backdrop', 'container', true, event));
    }
    if (!this.config.mutations.container && !this.config.mutations.backdrop) {
      el.classList.remove(this.config.classes.visible);
      this.emitter.emit('afterHide', this);
    }
  }

  
  /**
   * Toggle display modal
   * @param config I_ModalDisplayConfig
   */
  toggle(config?: I_ModalDisplayConfig) {
    this.config.visible ? this.hide(config) : this.show(config);
  }
}