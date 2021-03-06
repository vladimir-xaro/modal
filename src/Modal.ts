import { I_Backdrop, I_Modal, I_ModalConfig, I_ModalConstructorConfig, I_ModalDisplayConfig } from "./types";
import EventEmitter, { I_EventEmitter } from "@xaro/event-emitter";
import { defaults } from "./variables";
import Backdrop from "./Backdrop";
import CSSClassAnimations, { I_CSSClassAnimations, T_DOMEventsKeys } from "@xaro/css-class-animations";
import { initConfig } from "./helpers";

export default class Modal implements I_Modal {
  static instances:       I_Modal[]       = [];
  static blurEl:          Element | null  = null;

  protected pending:      boolean         = false;

  emitter:    I_EventEmitter;
  config:     I_ModalConfig;

  index:      number;
  backdrop:   I_Backdrop | null;

  animation?: I_CSSClassAnimations;

  /**
   * Create Modal
   * @param config I_ModalConstructorConfig
   */
  constructor(config: I_ModalConstructorConfig) {
    Modal.instances.push();
    this.index = Modal.instances.length - 1;

    let _config: any = initConfig(defaults, config);
    this.config = _config;
    this.config.user = config;

    this.emitter  = new EventEmitter(this.config.user.on);

    if (typeof config.el === 'string') {
      const el = document.querySelector(config.el);

      if (! el) {
        throw new Error("Element does not exists");
      }

      this.config.el = el;
    }

    if (! this.config.id) {
      this.config.id = this.config.el.getAttribute(this.config.attr.id) || '__modal-' + (Modal.instances.length - 1);
    }

    this.backdrop = Backdrop.instances.length ? Backdrop.instances[Backdrop.instances.length - 1] : new Backdrop();

    // set container el
    if (! this.config.container.el) {
      const containerEl = this.config.el.querySelector('.modal__container');
      
      if (! containerEl) {
        throw new Error('[Modal] Container does not exists');
      }

      this.config.container.el = containerEl;
    }

    // close by data-attribute
    if (this.config.allow.closeAttr) {
      this.__closeAttrListener              = this.__closeAttrListener.bind(this);
    }

    // close by escape key
    if (this.config.allow.closeEsc) {
      this.__closeEscListener               = this.__closeEscListener.bind(this);
    }

    // add animation-/transition- end listener to container
    if (this.config.container.mutation) {
      // this.__containerMutationEndListener = this.__containerMutationEndListener.bind(this);
      // this.config.container.el.addEventListener(this.config.container.mutation + 'end', this.__containerMutationEndListener);
      // TODO: CSSClassAnimations refactoring
      this.animation = new CSSClassAnimations({
        el: this.config.container.el,
        allow: [ this.config.container.mutation + 'end' as T_DOMEventsKeys ],
        on: {
          end: (event: AnimationEvent | TransitionEvent) => {
            this.emitter.emit('containerMutationEnd', this, event);
          }
        }
      });
    }

    // trigger attr
    for (const el of document.querySelectorAll(`[${this.config.attr.target}]`)) {
      if (el.getAttribute(this.config.attr.target) === this.config.id) {
        el.addEventListener('click', () => this.show());
      }
    }

    // allow click outside container
    if (this.config.allow.closeOutside) {
      this.__wrapperClickListener = this.__wrapperClickListener.bind(this);
      this.config.el.addEventListener('click', this.__wrapperClickListener as EventListener);
    }

    this.emitter.emit('init', this);
    
    if (this.config.visible) {
      this.show({ force: true });
    }
  }


  /** DOM wrapper click listener */
  protected __wrapperClickListener(event: MouseEvent) {
    if (event.target === this.config.el) {
      this.emitter.emit('outsideClick', this, event);
      this.hide();
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


  /** Animation/Transition container listener */
  // protected __containerMutationEndListener(event: any): void {
  //   this.emitter.emit('containerMutationEnd', this, event);
  // }


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
  protected mutationEndCallback(container: boolean, hide: boolean, event: AnimationEvent | TransitionEvent) {
    if (container) {
      this.config.container.animation = false;

      if (this.backdrop && this.backdrop.config.animation) {
        return;
      }
    } else if (this.backdrop) {
      this.backdrop.config.animation = false;

      if (this.config.container.animation) {
        return;
      }
    }

    this.pending = false;

    if (hide) {
      this.config.el.classList.remove(this.config.classes.visible);
      this.backdrop?.config.el.classList.remove(this.config.backdrop.properties.classes.visible);
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

    if (this.config.container.timeout) {
      clearTimeout(this.config.container.timeout);
    }
    if (this.backdrop && this.backdrop.config.timeout) {
      clearTimeout(this.backdrop.config.timeout);
    }

    const el        = this.config.el;
    const container = this.config.container.el;

    if (this.pending) {
      if (this.config.container.mutation) {
        const key = this.config.container.mutation;
        // container.classList.add(this.config.container.properties.classes[key].cancel);
        // TODO: CSSClassAnimations refactoring
        this.animation!.addClass(this.config.container.properties.classes[key].cancel)
      }
      if (this.backdrop && this.config.backdrop.mutation) {
        const key = this.config.backdrop.mutation;
        // this.backdrop.config.el.classList.add(this.config.backdrop.properties.classes[key].cancel);
        this.backdrop.animation.addClass(this.config.backdrop.properties.classes[key].cancel);
        // this.backdrop.emitter.unsubscribe('mutationEnd');
      }
      // this.emitter.unsubscribe('containerMutationEnd');
    }

    this.emitter.emit('beforeShow', this);

    this.config.visible = true;

    if (document.activeElement && document.hasFocus()) {
      Modal.blurEl = document.activeElement;
      (document.activeElement as HTMLElement).blur();
    }

    this.pending = true;
    if (this.config.container.mutation) {
      const key = this.config.container.mutation;
      // container.classList.remove(this.config.container.properties.classes[key].hide, this.config.container.properties.classes[key].cancel);
      this.animation!.removeClass(this.config.container.properties.classes[key].hide, this.config.container.properties.classes[key].cancel)
    }
    if (this.backdrop && this.config.backdrop.mutation) {
      const key = this.config.backdrop.mutation;
      // this.backdrop.config.el.classList.remove(this.config.backdrop.properties.classes[key].hide, this.config.backdrop.properties.classes[key].cancel);
      this.backdrop.animation.removeClass(this.config.backdrop.properties.classes[key].hide, this.config.backdrop.properties.classes[key].cancel);
    }

    el.classList.add(this.config.classes.visible);

    this.addListeners();

    if (this.config.container.mutation) {
      const key = this.config.container.mutation;

      this.config.container.animation = true;
      if (+this.config.container.timeouts[key] > 0) {
        this.config.container.timeout = setTimeout(() => {
          // container.classList.add(this.config.container.properties.classes[key].show);
          this.animation!.addClass(this.config.container.properties.classes[key].show)
        }, this.config.container.timeouts[key]);
      } else {
        // container.classList.add(this.config.container.properties.classes[key].show);
        this.animation!.addClass(this.config.container.properties.classes[key].show)
      }
    } else {
      // container.classList.add(this.config.container.properties.classes.common.show);
      this.animation!.addClass(this.config.container.properties.classes.common.show)
    }
    if (this.backdrop) {
      this.backdrop.config.el.classList.add(this.config.backdrop.properties.classes.visible);
      if (this.config.backdrop.mutation) {
        const key = this.config.backdrop.mutation;

        this.backdrop.config.animation = true;
        if (+this.config.backdrop.timeouts[key] > 0) {
          this.backdrop.config.timeout = setTimeout(() => {
            // this.backdrop!.config.el.classList.add(this.config.backdrop.properties.classes[key].show);
            this.backdrop!.animation.addClass(this.config.backdrop.properties.classes[key].show);
          }, this.config.backdrop.timeouts[key]);
        } else {
          // this.backdrop.config.el.classList.add(this.config.backdrop.properties.classes[key].show);
          this.backdrop!.animation.addClass(this.config.backdrop.properties.classes[key].show);
        }
      } else {
        // this.backdrop.config.el.classList.add(this.config.backdrop.properties.classes.common.show);
        this.backdrop!.animation.addClass(this.config.backdrop.properties.classes.common.show);
      }
    }

    if (! this.config.allow.bodyScroll) {
      document.body.style.overflow  = 'hidden';
      document.body.style.height    = '100vh';
    }

    if (this.config.container.mutation) {
      this.emitter.once('containerMutationEnd', event => this.mutationEndCallback(true, false, event));
    }
    if (this.backdrop && this.config.backdrop.mutation) {
      this.backdrop.emitter.once('mutationEnd', event => this.mutationEndCallback(false, false, event));
    }
    if (!this.config.container.mutation && !this.config.backdrop.mutation) {
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

    if (this.config.container.timeout) {
      clearTimeout(this.config.container.timeout);
    }
    if (this.backdrop && this.backdrop.config.timeout) {
      clearTimeout(this.backdrop.config.timeout);
    }

    const el        = this.config.el;
    const container = this.config.container.el;

    if (this.pending) {
      if (this.config.container.mutation) {
        const key = this.config.container.mutation;
        container.classList.add(this.config.container.properties.classes[key].cancel)
      }
      if (this.backdrop && this.config.backdrop.mutation) {
        const key = this.config.backdrop.mutation;
        this.backdrop.config.el.classList.add(this.config.backdrop.properties.classes[key].cancel);
        this.backdrop.emitter.unsubscribe('mutationEnd');
      }
      this.emitter.unsubscribe('containerMutationEnd');
    }

    this.emitter.emit('beforeHide', this);
    
    this.removeListeners();
    
    this.config.visible = false;

    this.pending = true;
    if (this.config.container.mutation) {
      const key = this.config.container.mutation;
      this.config.container.animation = true;
      container.classList.remove(this.config.container.properties.classes[key].show, this.config.container.properties.classes[key].cancel);
      container.classList.add(this.config.container.properties.classes[key].hide);
    } else {
      container.classList.remove(this.config.container.properties.classes.common.show);
    }
    if (this.backdrop) {
      if (this.config.backdrop.mutation) {
        const key = this.config.backdrop.mutation;
        this.backdrop.config.animation = true;
        this.backdrop.config.el.classList.remove(this.config.backdrop.properties.classes[key].show, this.config.backdrop.properties.classes[key].cancel);
        this.backdrop.config.el.classList.add(this.config.backdrop.properties.classes[key].hide);
      } else {
        this.backdrop.config.el.classList.remove(this.config.backdrop.properties.classes.common.show);
      }
    }

    if (Modal.blurEl) {
      (Modal.blurEl as HTMLElement).focus();
    }
    Modal.blurEl = null;

    if (! this.config.allow.bodyScroll) {
      document.body.style.overflow  = '';
      document.body.style.height    = '';
    }

    if (this.config.container.mutation) {
      this.emitter.once('containerMutationEnd', event => this.mutationEndCallback(true, true, event));
    }
    if (this.backdrop && this.config.backdrop.mutation) {
      this.backdrop.emitter.once('mutationEnd', event => this.mutationEndCallback(false, true, event));
    }

    if (this.backdrop) {
      if (! this.config.container.mutation && !this.config.backdrop.mutation) {
        el.classList.remove(this.config.classes.visible);
        this.emitter.emit('afterHide', this);
      }
    } else {
      if (! this.config.container.mutation) {
        el.classList.remove(this.config.classes.visible);
        this.emitter.emit('afterHide', this);
      }
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