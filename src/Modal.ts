import { I_Backdrop, I_Modal, I_ModalConfig, I_ModalConfigNEW, I_ModalConstructorConfig, I_ModalConstructorConfigNEW, I_ModalDisplayConfig, T_Mutation } from "./types";
import EventEmitter, { I_EventEmitter } from "@xaro/event-emitter";
import extend, { isObject } from "@xaro/extend";
import { defaults, defaultsNEW } from "./variables";
import Backdrop from "./Backdrop";

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

  protected container: { animation: boolean, timeout: number | null } = {
    animation:  false,
    timeout:    null
  }

  emitter:  I_EventEmitter;
  config:   I_ModalConfigNEW;

  // TODO: backdrop refactoring
  static instances: I_Modal[] = [];
  index:    number;
  backdrop: I_Backdrop | null;


  /**
   * Create Modal
   * @param config I_ModalConstructorConfig
   */
  constructor(config: I_ModalConstructorConfigNEW) {
    Modal.instances.push();
    this.index = Modal.instances.length - 1;

    let _config: any = this.initConfig(defaultsNEW, config);

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
      this.config.id = this.config.el.getAttribute(this.config.attr.id) || 'modal-' + Modal.lastUndefinedId++;
    }

    // if (! this.config.dom.backdrop) {
    //   this.config.dom.backdrop = this.config.el.querySelector('.modal__backdrop');
    // }
    // TODO: backdrop refactoring
    this.backdrop = Backdrop.instances.length ? Backdrop.instances[Backdrop.instances.length - 1] : new Backdrop();


    if (! this.config.container.el) {
      const containerEl = this.config.el.querySelector('.modal__container');
      
      if (! containerEl) {
        throw new Error('[Modal] Container does not exists');
      }

      this.config.container.el = containerEl as HTMLElement;
    }

    if (this.config.allow.closeAttr) {
      this.__closeAttrListener              = this.__closeAttrListener.bind(this);
    }
    if (this.config.allow.closeEsc) {
      this.__closeEscListener               = this.__closeEscListener.bind(this);
    }

    if (this.config.container.mutation) {
      this.__containerMutationEndListener = this.__containerMutationEndListener.bind(this);
      this.config.container.el.addEventListener(this.config.container.mutation + 'end', this.__containerMutationEndListener);
    }

    // trigger attr
    for (const el of document.querySelectorAll(`[${this.config.attr.target}]`)) {
      if (el.getAttribute(this.config.attr.target) === this.config.id) {
        el.addEventListener('click', () => this.show());
      }
    }

    this.__wrapperClickListener = this.__wrapperClickListener.bind(this);
    this.config.el.addEventListener('click', this.__wrapperClickListener as EventListener);

    this.emitter.emit('init', this);
    
    if (this.config.visible) {
      this.show({ force: true });
    }

    // this.config.dom.backdrop?.addEventListener('mousewheel', (event) => console.log(event));
    this.config.el.addEventListener('click', event => console.log(event));
  }

  protected initConfig(origin, user) {
    let config = {};
    for (const key in origin) {
      if (user.hasOwnProperty(key)) {
        if (isObject(origin[key]) && isObject(user[key])) {
          this.initConfig(origin[key], user[key]);
        } else {
          config[key] = user[key];
        }
      } else {
        config[key] = origin[key];
      }
    }
    return config;
  }


  /** DOM wrapper click listener */
  protected __wrapperClickListener(event: MouseEvent) {
    if (event.target === this.config.el) {
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

    if (this.backdrop && this.backdrop.config.animation) {
      return;
    }
    
    this.pending = false;
    
    if (hide) {
      this.config.el.classList.remove(this.config.classes.visible);
      if (this.backdrop) {
        this.backdrop.config.el.classList.remove(this.config.backdrop.properties.classes.visible);
      }
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
    const container = this.config.container.el;
    // const backdrop  = this.config.dom.backdrop;

    if (this.pending) {
      if (this.config.container.mutation) {
        const key = this.config.container.mutation;
        container.classList.add(this.config.classes[key].cancel);
      }
      if (this.backdrop && this.config.backdrop.mutation) {
        const key = this.config.backdrop.mutation;
        this.backdrop.config.el.classList.add(this.config.backdrop.properties.classes[key].cancel);
        // TODO: backdrop refactoring
        // this.backdrop.addClass(animationType, classType)
        this.backdrop.emitter.unsubscribe('mutationEnd');
      }
      // this.emitter.unsubscribe('containerMutationEnd', 'backdropMutationEnd');
      // TODO: backdrop refactoring
      this.emitter.unsubscribe('containerMutationEnd');
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
      container.classList.remove(this.config.container.properties.classes[key].hide, this.config.container.properties.classes[key].cancel);
    }
    if (this.backdrop && this.config.backdrop.mutation) {
      const key = this.config.backdrop.mutation;
      this.backdrop.config.el.classList.remove(this.config.backdrop.properties.classes[key].hide, this.config.backdrop.properties.classes[key].cancel);
    }

    el.classList.add(this.config.classes.visible);

    this.addListeners();

    if (this.config.container.mutation) {
      const key = this.config.container.mutation;

      this.animation.container = true;
      if (+this.config.container.timeouts[key] > 0) {
        this.timeout.container = setTimeout(() => {
          container.classList.add(this.config.container.properties.classes[key].show);
        }, this.config.container.timeouts[key]);
      } else {
        container.classList.add(this.config.container.properties.classes[key].show);
      }
    } else {
      container.classList.add(this.config.container.properties.classes.common.show);
    }
    if (this.backdrop) {
      this.backdrop.config.el.classList.add(this.config.backdrop.properties.classes.visible);
      if (this.config.backdrop.mutation) {
        const key = this.config.backdrop.mutation;

        this.animation.backdrop = true;
        if (+this.config.backdrop.timeouts[key] > 0) {
          this.timeout.backdrop = setTimeout(() => {
            this.backdrop!.config.el.classList.add(this.config.backdrop.properties.classes[key].show);
          }, this.config.backdrop.timeouts[key]);
        } else {
          this.backdrop.config.el.classList.add(this.config.backdrop.properties.classes[key].show);
        }
      } else {
        this.backdrop.config.el.classList.add(this.config.backdrop.properties.classes.common.show);
      }
    }

    if (! this.config.allow.bodyScroll) {
      document.body.style.overflow  = 'hidden';
      document.body.style.height    = '100vh';
    }

    if (this.config.container.mutation) {
      this.emitter.once('containerMutationEnd', event => this.mutationEndCallback('container', 'backdrop', false, event));
    }
    // if (this.config.mutations.backdrop) {
    //   this.emitter.once('backdropMutationEnd', event => this.mutationEndCallback('backdrop', 'container', false, event));
    // }
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

    for (const key in this.timeout) {
      if (this.timeout[key]) {
        clearTimeout(this.timeout[key]);
      }
    }

    const el        = this.config.el;
    const container = this.config.container.el;
    // const backdrop  = this.config.dom.backdrop;

    if (this.pending) {
      if (this.config.container.mutation) {
        const key = this.config.container.mutation;
        container.classList.add(this.config.container.properties.classes[key].cancel)
      }
      if (this.backdrop && this.config.backdrop.mutation) {
        const key = this.config.backdrop.mutation;
        this.backdrop.config.el.classList.add(this.config.backdrop.properties.classes[key].cancel);
        // TODO: backdrop refactoring
        // this.backdrop.addClass(animationType, classType)
        this.backdrop.emitter.unsubscribe('mutationEnd');
      }
      // this.emitter.unsubscribe('containerMutationEnd', 'backdropMutationEnd');
      // TODO: backdrop refactoring
      this.emitter.unsubscribe('containerMutationEnd');
    }

    this.emitter.emit('beforeHide', this);
    
    this.removeListeners();
    
    this.config.visible = false;

    this.pending = true;
    if (this.config.container.mutation) {
      const key = this.config.container.mutation;
      this.animation.container = true;
      container.classList.remove(this.config.container.properties.classes[key].show, this.config.container.properties.classes[key].cancel);
      container.classList.add(this.config.container.properties.classes[key].hide);
    } else {
      container.classList.remove(this.config.container.properties.classes.common.show);
    }
    if (this.backdrop) {
      if (this.config.backdrop.mutation) {
        const key = this.config.backdrop.mutation;
        this.animation.backdrop = true;
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
      this.emitter.once('containerMutationEnd', event => this.mutationEndCallback('container', 'backdrop', true, event));
    }
    if (this.config.backdrop.mutation) {
      this.emitter.once('backdropMutationEnd', event => this.mutationEndCallback('backdrop', 'container', true, event));
    }
    if (!this.config.container.mutation && !this.config.backdrop.mutation) {
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