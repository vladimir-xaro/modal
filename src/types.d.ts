import { I_EventEmitter } from "@xaro/event-emitter";

/** Modal */
export interface I_Modal {
  emitter:  I_EventEmitter;
  config:   I_ModalConfig;

  show(config?: I_ModalDisplayConfig): void;
  hide(config?: I_ModalDisplayConfig): void;
  toggle(config?: I_ModalDisplayConfig): void;
}

export interface I_ModalConstructorConfig {
  id?:          string;                 // for data attr target
  el:           HTMLElement | string;   // main wrapper
  visible?:     boolean;                // show after init
  animations?:  boolean;                // XOR transtions (priority, default)
  transitions?: boolean;                // XOR animations
  attr?: {
    close?:             string;         // add close listeners
    target?:            string;         // open modal by
    id?:                string;         // unique modal id
  };
  timeout?: {
    container?: {
      animations?:        number;
      transitions?:       number;
    };
    backdrop?: {
      animations?:        number;
      transitions?:       number;
    };
  };
  allow?: {
    bodyScroll?:        boolean;        // allow body scroll (default: false)
    closeEsc?:          boolean;        // allow close modal by esc key (default: true)
    closeAttr?:         boolean;        // allow close modal by [attr.close] (default: true)
    animateContainer?:  boolean;        // modal will use css animations on fade in/out (default: true)
    animateBackdrop?:   boolean;        // modal will use css transitions on fade in/out (default: true)
  };
  selector?: {
    container?:         string;         // default: '.modal__container'
    backdrop?:          string;         // default: '.modal__backdrop'
    btnClose?:          string;         // default: '.modal__btn-close'
  };
  classes?: {
    visible?:           string;         // default: 'modal--visible'
    animation?: {
      cancel?:            string;       // default: 'modal-animation--cancel'
      show?: {
        container?:         string;     // default: 'modal-animation-container--show'
        backdrop?:          string;     // default: 'modal-animation-backdrop--show'
      };
      hide?: {
        container?:         string;     // default: 'modal-animation-container--hide'
        backdrop?:          string;     // default: 'modal-animation-backdrop--hide'
      };
    };
    transition?: {
      cancel?:            string;       // default: 'modal-transition--cancel'
      show?: {
        container?:         string;     // default: 'modal-transition-container--show'
        backdrop?:          string;     // default: 'modal-transition-backdrop--show'
      };
      hide?: {
        container?:         string;     // default: 'modal-transition-container--hide'
        backdrop?:          string;     // default: 'modal-transition-backdrop--hide'
      };
    };
  };

  on?: {
    init?:            (modal: I_Modal) => void | ((modal: I_Modal) => void)[];
    beforeHide?:      (modal: I_Modal) => void | ((modal: I_Modal) => void)[];
    afterHide?:       (modal: I_Modal, event?: AnimationEvent | TransitionEvent) => void | ((modal: I_Modal, event?: AnimationEvent | TransitionEvent) => void)[];
    beforeShow?:      (modal: I_Modal) => void | ((modal: I_Modal) => void)[];
    afterShow?:       (modal: I_Modal, event?: AnimationEvent | TransitionEvent) => void | ((modal: I_Modal, event?: AnimationEvent | TransitionEvent) => void)[];
    escKey?:          (modal: I_Modal, event?: KeyboardEvent) => void | ((modal: I_Modal, event?: KeyboardEvent) => void)[];
    closeAttrClick?:  (modal: I_Modal, event?: MouseEvent) => void | ((modal: I_Modal, event?: MouseEvent) => void)[];
  };
}

export interface I_ModalConfig {
  id:           string;
  el:           HTMLElement;
  dom: {
    backdrop:         HTMLElement | null,
    container:        HTMLElement
  };
  visible:      boolean;
  animations:   boolean;
  transitions:  boolean;
  timeout: {
    container: {
      animations:     number;
      transitions:    number;
    };
    backdrop: {
      animations:     number;
      transitions:    number;
    };
  };
  attr: {
    close:            string;
    target:           string;
    id:               string;
  };
  allow: {
    bodyScroll:       boolean;
    closeEsc:         boolean;
    closeAttr:        boolean;
    animateContainer: boolean;
    animateBackdrop:  boolean;
  };
  selector: {
    container:        string;
    backdrop:         string;
    btnClose:         string;
  };
  classes: {
    visible:          string;
    animation: {
      cancel:           string;
      show: {
        container:        string;
        backdrop:         string;
      };
      hide: {
        container:        string;
        backdrop:         string;
      };
    };
    transition: {
      cancel:           string;
      show: {
        container:        string;
        backdrop:         string;
      };
      hide: {
        container:        string;
        backdrop:         string;
      };
    };
  };
}

export interface I_ModalDisplayConfig {
  // animation?:     boolean;
  // ignoreEvents?:  boolean;
  force?: boolean;
}