import { I_EventEmitter } from "@xaro/event-emitter";

/** Modal */
export interface I_Modal {
  emitter:  I_EventEmitter;
  config:   I_ModalConfigNEW;

  show(config?: I_ModalDisplayConfig): void;
  hide(config?: I_ModalDisplayConfig): void;
  toggle(config?: I_ModalDisplayConfig): void;
}

interface I_ModalConfigBase {
  id?:          string;                 // for data attr target (or [data-modal-id], priority - object property)
  el:           Element | string;       // main wrapper
  visible?:     boolean;                // show after init
  mutations?: {
    container?:         T_Mutation;     // container animation type
    backdrop?:          T_Mutation;     // backdrop animation type
  }
  
  
  // TODO: backdrop refactoring
  container?: {
    animation:  boolean;
    timeout:    number | null;

  };


  timeout?: {
    container?: {
      animation?:       number;       // add class with animation to container after %number% ms (default: 0)
      transition?:      number;       // add class with transitions to container after %number% ms (default: 100), preferably more than 50
      // common?:          number;       // add class without animations to container after %number% ms (default: 0)
    };
    backdrop?: {
      animation?:       number;       // add class with animation to backdrop after %number% ms (default: 0)
      transition?:      number;       // add class with transition to backdrop after %number% ms (default: 50), preferably more than 50
      // common?:          number;       // add class without animations to backdrop after %number% ms (default: 0)
    };
  };
  attr?: {
    close?:             string;         // add close listeners
    target?:            string;         // open modal by
    id?:                string;         // unique modal id
  };
  allow?: {
    bodyScroll?:        boolean;        // allow body scroll (default: false)
    closeEsc?:          boolean;        // allow close modal by esc key (default: true)
    closeAttr?:         boolean;        // allow close modal by [attr.close] (default: true)
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
    common?: {
      show?: {
        container?:         string;     // default: 'modal-container--show'
        backdrop?:          string;     // default: 'modal-backdrop--show'
      };
      hide?: {
        container?:         string;     // default: 'modal-container--hide'
        backdrop?:          string;     // default: 'modal-backdrop--hide'
      };
    };
  };
  backdrop?: {                          // backdrop settings
    on?: {

    }
  } | null;

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

export interface I_ModalConstructorConfig extends I_ModalConfigBase {
  // id?:          string;                 // for data attr target (or [data-modal-id], priority - object property)
  // el:           Element | string;       // main wrapper
  // visible?:     boolean;                // show after init
  // mutations?: {
  //   container?:         T_Mutation;     // container animation type
  //   backdrop?:          T_Mutation;     // backdrop animation type
  // }
  // timeout?: {
  //   container?: {
  //     animation?:       number;       // add class with animation to container after %number% ms (default: 0)
  //     transition?:      number;       // add class with transitions to container after %number% ms (default: 100), preferably more than 50
  //     // common?:          number;       // add class without animations to container after %number% ms (default: 0)
  //   };
  //   backdrop?: {
  //     animation?:       number;       // add class with animation to backdrop after %number% ms (default: 0)
  //     transition?:      number;       // add class with transition to backdrop after %number% ms (default: 50), preferably more than 50
  //     // common?:          number;       // add class without animations to backdrop after %number% ms (default: 0)
  //   };
  // };
  // attr?: {
  //   close?:             string;         // add close listeners
  //   target?:            string;         // open modal by
  //   id?:                string;         // unique modal id
  // };
  // allow?: {
  //   bodyScroll?:        boolean;        // allow body scroll (default: false)
  //   closeEsc?:          boolean;        // allow close modal by esc key (default: true)
  //   closeAttr?:         boolean;        // allow close modal by [attr.close] (default: true)
  // };
  // selector?: {
  //   container?:         string;         // default: '.modal__container'
  //   backdrop?:          string;         // default: '.modal__backdrop'
  //   btnClose?:          string;         // default: '.modal__btn-close'
  // };
  // classes?: {
  //   visible?:           string;         // default: 'modal--visible'
  //   animation?: {
  //     cancel?:            string;       // default: 'modal-animation--cancel'
  //     show?: {
  //       container?:         string;     // default: 'modal-animation-container--show'
  //       backdrop?:          string;     // default: 'modal-animation-backdrop--show'
  //     };
  //     hide?: {
  //       container?:         string;     // default: 'modal-animation-container--hide'
  //       backdrop?:          string;     // default: 'modal-animation-backdrop--hide'
  //     };
  //   };
  //   transition?: {
  //     cancel?:            string;       // default: 'modal-transition--cancel'
  //     show?: {
  //       container?:         string;     // default: 'modal-transition-container--show'
  //       backdrop?:          string;     // default: 'modal-transition-backdrop--show'
  //     };
  //     hide?: {
  //       container?:         string;     // default: 'modal-transition-container--hide'
  //       backdrop?:          string;     // default: 'modal-transition-backdrop--hide'
  //     };
  //   };
  //   common?: {
  //     show?: {
  //       container?:         string;     // default: 'modal-container--show'
  //       backdrop?:          string;     // default: 'modal-backdrop--show'
  //     };
  //     hide?: {
  //       container?:         string;     // default: 'modal-container--hide'
  //       backdrop?:          string;     // default: 'modal-backdrop--hide'
  //     };
  //   };
  // };

  // on?: {
  //   init?:            (modal: I_Modal) => void | ((modal: I_Modal) => void)[];
  //   beforeHide?:      (modal: I_Modal) => void | ((modal: I_Modal) => void)[];
  //   afterHide?:       (modal: I_Modal, event?: AnimationEvent | TransitionEvent) => void | ((modal: I_Modal, event?: AnimationEvent | TransitionEvent) => void)[];
  //   beforeShow?:      (modal: I_Modal) => void | ((modal: I_Modal) => void)[];
  //   afterShow?:       (modal: I_Modal, event?: AnimationEvent | TransitionEvent) => void | ((modal: I_Modal, event?: AnimationEvent | TransitionEvent) => void)[];
  //   escKey?:          (modal: I_Modal, event?: KeyboardEvent) => void | ((modal: I_Modal, event?: KeyboardEvent) => void)[];
  //   closeAttrClick?:  (modal: I_Modal, event?: MouseEvent) => void | ((modal: I_Modal, event?: MouseEvent) => void)[];
  // };
}

// TODO: backdrop refactoring
export interface I_ModalConstructorConfigNEW extends Object {
  id?:      string;           // default increment number
  el:       Element | string; // dom element or selector of modal container
  visible?: boolean;          // force to show after init
  attr?: {
    close?:       string;     // close data-attribute (for mouse click)
    target?:      string;     // modal trigger data-attribute
    id?:          string;     // modal id data-attribute
  };
  allow?: {
    bodyScroll?:  boolean;    // allow body scroll while modal is show
    closeEsc?:    boolean;    // allow close modal by escape key
    closeAttr?:   boolean;    // allow close data-attribute
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
    // timeout?:     number | null;
    animation?:   boolean;
    timeouts?: {
      animation?:   number;
      transition?:  number;
    };

    properties: {
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
export interface I_ModalConfigNEW {
  id:       string;
  el:       Element;
  visible:  boolean;
  attr: {
    close:      string;
    target:     string;
    id:         string;
  };
  allow: {
    bodyScroll: boolean;
    closeEsc:   boolean;
    closeAttr:  boolean;
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

  user: I_ModalConstructorConfigNEW;
}

export interface I_ModalConfig extends I_ModalConfigBase{
  id:           string;
  el:           Element;
  dom: {
    backdrop:         Element | null,
    container:        Element
  };
  visible:      boolean;
  mutations: {
    container:    T_Mutation;
    backdrop:     T_Mutation;
  };
  timeout: {
    container: {
      animation:     number;
      transition:    number;
    };
    backdrop: {
      animation:     number;
      transition:    number;
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
    common: {
      show: {
        container:       string;
        backdrop:        string;
      };
      hide: {
        container:       string;
        backdrop:        string;
      };
    };
  };
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