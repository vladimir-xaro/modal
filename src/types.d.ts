import { I_EventEmitter } from "@xaro/event-emitter";

/** Modal */
export interface I_Modal {
  emitter:  I_EventEmitter;
  config:   I_ModalConfig;
  animation: { container: boolean, backdrop: boolean };
  timeout: { container?: number, backdrop?: number };

  show(config?: I_ModalDisplayConfig): void;
  hide(config?: I_ModalDisplayConfig): void;
  toggle(config?: I_ModalDisplayConfig): void;
}

export interface I_ModalConstructorConfig {
  id?:          string;
  el:           HTMLElement | string;
  visible?:     boolean;
  animations?:  boolean;  // OR transtions (priority, default)
  transitions?: boolean;  // OR animations
  attr?: {
    close?:             string;
    target?:            string;
    id?:                string;
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
    bodyScroll?:        boolean;
    closeEsc?:          boolean;
    closeAttr?:         boolean;
    animateContainer?:  boolean;
    animateBackdrop?:   boolean;
  };
  selector?: {
    container?:         string;
    backdrop?:          string;
    btnClose?:          string;
  };
  classes?: {
    visible?:           string;
    animation?: {
      cancel?:            string;
      show?: {
        container?:         string;
        backdrop?:          string;
      };
      hide?: {
        container?:         string;
        backdrop?:          string;
      };
    };
    transition?: {
      cancel?:            string;
      show?: {
        container?:         string;
        backdrop?:          string;
      };
      hide?: {
        container?:         string;
        backdrop?:          string;
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