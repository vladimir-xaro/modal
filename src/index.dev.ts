import "./scss/Modal.scss";
import "./scss/Dev.scss";

import Modal, { I_Modal } from "./";

const modal = new Modal({
  el: '.modal-1',
  // mutations: {
  //   container:  'transition',
  //   backdrop:   'transition'
  // },
  // visible: true,
});

(window as any).modal = modal;