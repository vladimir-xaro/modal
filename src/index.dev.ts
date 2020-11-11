import './scss';
import Modal, { I_Modal } from "./";

const modal1 = new Modal({
  id: 'test',
  // el: document.querySelector('.modal-1') as HTMLElement,
  el: '.modal-1',
  // visible: true,
  // animations: true,
  // transitions: true,
  mutations: {
    container:  'transition',
    backdrop:   'transition',
  },
  timeout: {
    container: {
      animation:   100,
      transition:  250
    },
    backdrop: {
      animation:   0,
      transition:  50
    },
  },
  attr: {
    close:  'data-close',
    target: 'data-target',
    id:     'data-id',
  },
  allow: {
    bodyScroll: true,
    // closeEsc:   false,
    // closeAttr:  false,
  },
  
});
// const modal2 = new Modal({
//   el: document.querySelector('.modal-2') as HTMLElement,
//   animations: true,
// });

// document.querySelector('.btn-1')?.addEventListener('click', () => {
//   modal1.show();
// });
// document.querySelector('.btn-2')?.addEventListener('click', () => {
//   modal2.show();
// });

(window as any).modal1 = modal1;
// (window as any).modal2 = modal2;