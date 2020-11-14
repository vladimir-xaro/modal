# @xaro/modal

TS Modal library with animations, transitions and events
> This is an <span style="color:red">*alpha*</span> version of the package and some configuration properties are not implemented or may not work.
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
import Modal from "@xaro/modal";

const modal = new Modal({
  el: document.querySelector('.modal') as HTMLElement // OR '.modal'
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

interface I_ModalConstructorConfig {
  id?:          string;                 // for data attr target (or [data-modal-id], priority - object property)
  el:           HTMLElement | string;   // main wrapper
  visible?:     boolean;                // show after init
  mutations?: {
    container?:         T_Mutation;     // container animation type
    backdrop?:          T_Mutation;     // backdrop animation type
  }
  timeout?: {
    container?: {
      animation?:        number;       // add class with animation to container after %number% ms (default: 0)
      transition?:       number;       // add class with transitions to container after %number% ms (default: 100), preferably more than 50

    };
    backdrop?: {
      animation?:        number;       // add class with animation to backdrop after %number% ms (default: 0)
      transition?:       number;       // add class with transition to backdrop after %number% ms (default: 50), preferably more than 50
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

interface I_ModalDisplayConfig {
  force?: boolean;
}

type T_Mutation = 'animation' | 'transition' | false;
```

## License
[MIT](LICENSE)