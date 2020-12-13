import { I_EventEmitter } from "@xaro/event-emitter";
import { I_CSSClassAnimations } from "@xaro/css-class-animations";

/** Modal */
export interface I_Modal {
  emitter:    I_EventEmitter;
  config:     I_ModalConfig;
  animation?: I_CSSClassAnimations;

  show(config?: I_ModalDisplayConfig): void;
  hide(config?: I_ModalDisplayConfig): void;
  toggle(config?: I_ModalDisplayConfig): void;
}

export interface I_ModalConstructorConfig extends Object {
  id?:      string;           // default increment number
  el:       Element | string; // dom element or selector of modal container
  visible?: boolean;          // force to show after init
  attr?: {
    close?:       string;     // close data-attribute (for mouse click)
    target?:      string;     // modal trigger data-attribute
    id?:          string;     // modal id data-attribute
  };
  allow?: {
    bodyScroll?:    boolean;  // allow body scroll while modal is show
    closeEsc?:      boolean;  // allow close modal by escape key
    closeAttr?:     boolean;  // allow close data-attribute
    closeOutside?:  boolean;  // allow close when click outside container
  };
  classes?: {
    visible?:     string;     // default: 'modal--visible'
  };
  container?: {
    el?:          Element;    // custom container el
    mutation?:    T_Mutation; // animation type (animation OR transition)
    animation?:   boolean;    // animation status
    timeouts?: {
      animation?:   number;   // add class with animation to container after %number% ms (default: 0)
      transition?:  number;   // add class with transitions to container after %number% ms (default: 100), preferably more than 50
    };

    properties?: {
      selector?:    string;   // default: '.modal__container'
      classes?: {
        animation?: {
          cancel?:    string; // default: 'modal-animation-container--cancel'
          show?:      string; // default: 'modal-animation-container--show'
          hide?:      string; // default: 'modal-animation-container--hide'
        };
        transition?: {
          cancel?:    string; // default: 'modal-transition-container--cancel'
          show?:      string; // default: 'modal-transition-container--show'
          hide?:      string; // default: 'modal-transition-container--hide'
        };
        common?: {
          show?:      string; // default: 'modal-container--show'
          hide?:      string; // default: 'modal-container--hide'
        };
      };
    };
  };
  backdrop?: {
    mutation?:    T_Mutation; // animation type (animation OR transition)
    timeouts?: {
      animation?:   number;   // add class with animation to backdrop after %number% ms (default: 0)
      transition?:  number;   // add class with transitions to backdrop after %number% ms (default: 50), preferably more than 50
    };
    properties?: {
      mutation?:    T_Mutation;
      classes?: {
        visible?:     string; // default: 'modal-backdrop--visible'
        animation?: {
          cancel?:    string; // default: 'modal-animation-backdrop--cancel'
          show?:      string; // default: 'modal-animation-backdrop--show'
          hide?:      string; // default: 'modal-animation-backdrop--hide'
        };
        transition?: {
          cancel?:    string; // default: 'modal-transition-backdrop--cancel'
          show?:      string; // default: 'modal-transition-backdrop--show'
          hide?:      string; // default: 'modal-transition-backdrop--hide'
        };
        common?: {
          show?:      string; // default: 'modal-backdrop--show'
          hide?:      string; // default: 'modal-backdrop--hide'
        };
      };
    };
  };

  on?: {
    init?:            ((modal: I_Modal) => void) | ((modal: I_Modal) => void)[];
    beforeHide?:      ((modal: I_Modal) => void) | ((modal: I_Modal) => void)[];
    afterHide?:       ((modal: I_Modal, event?: AnimationEvent | TransitionEvent) => void) | ((modal: I_Modal, event?: AnimationEvent | TransitionEvent) => void)[];
    beforeShow?:      ((modal: I_Modal) => void) | ((modal: I_Modal) => void)[];
    afterShow?:       ((modal: I_Modal, event?: AnimationEvent | TransitionEvent) => void) | ((modal: I_Modal, event?: AnimationEvent | TransitionEvent) => void)[];
    escKey?:          ((modal: I_Modal, event?: KeyboardEvent) => void) | ((modal: I_Modal, event?: KeyboardEvent) => void)[];
    closeAttrClick?:  ((modal: I_Modal, event?: MouseEvent) => void) | ((modal: I_Modal, event?: MouseEvent) => void)[];
    outsideClick?:    ((modal: I_Modal, event?: MouseEvent) => void) | ((modal: I_Modal, event?: MouseEvent) => void)[];
  };
}

export interface I_ModalConfig {
  id:       string;
  el:       Element;
  visible:  boolean;
  attr: {
    close:      string;
    target:     string;
    id:         string;
  };
  allow: {
    bodyScroll:   boolean;
    closeEsc:     boolean;
    closeAttr:    boolean;
    closeOutside: boolean;
  };
  classes: {
    visible:    string;
  };
  container: {
    el:         Element;
    wrapper:    Element;
    mutation:   T_Mutation;
    timeout:    number | null;
    animation:  boolean;
    timeouts: {
      animation:    number;
      transition:   number;
    };

    properties: {
      selector:     string;
      classes: {
        animation: {
          cancel:     string;
          show:       string;
          hide:       string;
        };
        transition: {
          cancel:     string;
          show:       string;
          hide:       string;
        };
        common: {
          show:       string;
          hide:       string;
        };
      };
    };
  };
  backdrop: {
    mutation:     T_Mutation;
    timeouts: {
      animation:    number;
      transition:   number;
    };
    properties: {
      classes: {
        visible:      string;
        animation: {
          cancel:     string;
          show:       string;
          hide:       string;
        };
        transition: {
          cancel:     string;
          show:       string;
          hide:       string;
        };
        common: {
          show:       string;
          hide:       string;
        };
      };
    };
  };

  user: I_ModalConstructorConfig;
}

export interface I_ModalDisplayConfig {
  force?: boolean;    // ignore current config.visible status
  // animation?:     boolean;
  // ignoreEvents?:  boolean;
}

/** Backdrop */
export interface I_Backdrop {
  emitter:    I_EventEmitter;
  config:     I_BackdropConfig;
  animation:  I_CSSClassAnimations;
}

export interface I_BackdropConfig {
  el:         Element;        // dom element
  visible:    boolean;        // is displayed
  mutation:   T_Mutation;     // current modal mutation
  animation:  boolean;        // animation status
  timeout:    number | null;  // timeout id or null
}

export type T_Mutation = 'animation' | 'transition' | false;