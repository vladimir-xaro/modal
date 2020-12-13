# @xaro/modal

TS Modal library with animations, transitions and events
> This is an **alpha** version of the package and some configuration properties are not implemented or may not work.
> The names and meanings of configuration properties are subject to change in the future.

## Usage

*file.html*
```html
<!--head-->
  <link rel="stylesheet" href="Modal.css">  // or import from "@xaro/modal/dev/scss/Modal.scss";
  <link rel="stylesheet" href="Default.theme.css">  // or import from "@xaro/modal/dev/scss/themes/Default.theme.scss";
<!--/head-->
<!--body-->
<button data-modal-target="test-modal">
<div class="modal" data-modal-id="test-modal">
  <div class="modal__backdrop" data-modal-close></div>
  <div class="modal__container">
    <button data-modal-close>Close</button>
  </div>
</div>
<!--/body-->
```
*file.ts*
```ts
import Modal, { I_Modal } from "@xaro/modal";

const modal = new Modal({
  el: '.modal',
  on: {
    afterShow(modal: I_Modal, event?: AnimationEvent | TransitionEvent) {
      console.log('I\'m showing after container and backdrop animations/transitions are complete');
    }
  }
  // You can see other properties and events below
});
```

## Interfaces & Types

*types.d.ts*
```ts
interface I_Modal {
  emitter:  I_EventEmitter;
  config:   I_ModalConfig;

  show(config?: I_ModalDisplayConfig): void;
  hide(config?: I_ModalDisplayConfig): void;
  toggle(config?: I_ModalDisplayConfig): void;
}

interface I_ModalConstructorConfig extends Object {
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

interface I_ModalDisplayConfig {
  force?: boolean;    // ignore current config.visible status
  // animation?:     boolean;
  // ignoreEvents?:  boolean;
}

type T_Mutation = 'animation' | 'transition' | false;
```

## License
[MIT](LICENSE)