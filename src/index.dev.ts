import './scss';
import Modal from "./";
import { I_Modal } from "./types";

const modal = new Modal({
  el: document.querySelector('.modal') as HTMLElement,
  allow: {
    closeEsc: true
  },
  // animations: false,
  transitions: true,
  on: {
    init: (modal: I_Modal) => {

    },
    afterShow: (modal: I_Modal) => {
      console.log('[Modal] afterShow');
    }
  }
});

document.querySelector('.btn')?.addEventListener('click', () => {
  modal.show();
});

(window as any).modal = modal;