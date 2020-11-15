import "./scss/Modal.scss";
import "./scss/Dev.scss";

import Modal, { I_Modal } from "./";

const modal = new Modal({
  el: '.modal-1',
  container: {
    mutation: 'transition'
  },
  backdrop: {
    mutation: 'transition'
  }
});

(window as any).modal = modal;