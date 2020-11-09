import './scss';
import Modal, { I_Modal } from "./";

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