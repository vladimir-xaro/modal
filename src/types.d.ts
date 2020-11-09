import { I_EventEmitter } from "@xaro/event-emitter";

/** Tabs */
export interface I_Modal {
  emitter:  I_EventEmitter;
  config:   I_ModalConfig;
  pending:  boolean;
  animation: { container: boolean, backdrop: boolean };

  show(config?: I_ModalDisplayConfig): void;
  hide(config?: I_ModalDisplayConfig): void;
}

export interface I_ModalConstructorConfig {
  el:               HTMLElement;
  visible?:         boolean;
  animate?:         boolean;
  allow?: {
    closeEsc?:          boolean;
    closeAttr?:         boolean;
    animateContainer?:  boolean;
    animateBackdrop?:   boolean;
  };
  selector?: {
    container?: string;
    backdrop?:  string;
    close?:     string;
  };
  classes?: {
    visible?:   string;
    animation?: {
      cancel?:  string;
      show?: {
        container?: string;
        backdrop?:  string;
      };
      hide?: {
        container?: string;
        backdrop?:  string;
      };
    };
  };
  closeAttr?: string;


  on?: {
    init?:            (modal: I_Modal) => void | ((modal: I_Modal) => void)[];
    beforeHide?:      (modal: I_Modal) => void | ((modal: I_Modal) => void)[];
    afterHide?:       (modal: I_Modal, event?: AnimationEvent) => void | ((modal: I_Modal, event?: AnimationEvent) => void)[];
    beforeShow?:      (modal: I_Modal) => void | ((modal: I_Modal) => void)[];
    afterShow?:       (modal: I_Modal, event?: AnimationEvent) => void | ((modal: I_Modal, event?: AnimationEvent) => void)[];
    escKey?:          (modal: I_Modal, event?: KeyboardEvent) => void | ((modal: I_Modal, event?: KeyboardEvent) => void)[];
    closeAttrClick?:  (modal: I_Modal, event?: MouseEvent) => void | ((modal: I_Modal, event?: MouseEvent) => void)[];
  };
}

export interface I_ModalConfig {
  el:         HTMLElement;
  dom: {
    backdrop:   HTMLElement | null,
    container:  HTMLElement
  };
  visible:    boolean;
  animate:    boolean;
  allow: {
    closeEsc:         boolean;
    closeAttr:        boolean;
    animateContainer: boolean;
    animateBackdrop:  boolean;
  };
  selector: {
    container:  string;
    backdrop:   string;
    close:      string;
  };
  classes: {
    visible:    string;
    animation: {
      cancel:     string;
      show: {
        container:  string;
        backdrop:   string;
      };
      hide: {
        container:  string;
        backdrop:   string;
      };
    };
  };
  closeAttr:  string;
}

export interface I_ModalDisplayConfig {
  // animation?:     boolean;
  // ignoreEvents?:  boolean;
}