import { I_EventEmitter } from "@xaro/event-emitter";

/** Modal */
export interface I_Modal {
  emitter:  I_EventEmitter;
  config:   I_ModalConfig;

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
    visible?:     string;
  };
  timeouts?: {
    animation?: {
      show?:  number;
      hide?:  number;
    };
    transition?: {
      show?:  number;
      hide?:  number;
    };
  };
  container?: {
    el?:          Element;
    wrapper?:     Element;
    mutation?:    T_Mutation;
    animation?:   boolean;
    timeouts?: {
      animation?:   number;
      transition?:  number;
    };

    properties?: {
      selector?:    string;
      classes?: {
        animation?: {
          cancel?:    string;
          show?:      string;
          hide?:      string;
        };
        transition?: {
          cancel?:    string;
          show?:      string;
          hide?:      string;
        };
        common?: {
          show?:      string;
          hide?:      string;
        };
      };
    };
  };
  backdrop?: {
    mutation?:    T_Mutation;
    timeouts?: {
      animation?:   number;
      transition?:  number;
    };
    properties?: {
      // selector?:    string;
      mutation?:    T_Mutation;
      classes?: {
        visible?:     string;
        animation?: {
          cancel?:    string;
          show?:      string;
          hide?:      string;
        };
        transition?: {
          cancel?:    string;
          show?:      string;
          hide?:      string;
        };
        common?: {
          show?:      string;
          hide?:      string;
        };
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
    // el:         Element;
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
  emitter:  I_EventEmitter;
  config:   I_BackdropConfig;
}

export interface I_BackdropConfig {
  el:         Element;        // dom element
  visible:    boolean;        // is displayed
  mutation:   T_Mutation;     // current modal mutation
  animation:  boolean;        // animation status
  timeout:    number | null;  // timeout id or null
  // user: User Config (constructor config)
  properties: {
    // selector:   string;
    classes: {
      animation: {
        cancel:   string;
        show:     string;
        hide:     string;
      };
      transition: {
        cancel:   string;
        show:     string;
        hide:     string;
      };
      common: {
        show:     string;
        hide:     string;
      };
    };
  };
}

export type T_Mutation = 'animation' | 'transition' | false;