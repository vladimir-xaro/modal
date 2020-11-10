import './scss';
import Modal, { I_Modal } from "./";

const modal1 = new Modal({
  el: document.querySelector('.modal-1') as HTMLElement,
  transitions: true,
  // visible: true,
});
const modal2 = new Modal({
  el: document.querySelector('.modal-2') as HTMLElement,
  animations: true,
});

// document.querySelector('.btn-1')?.addEventListener('click', () => {
//   modal1.show();
// });
// document.querySelector('.btn-2')?.addEventListener('click', () => {
//   modal2.show();
// });

(window as any).modal1 = modal1;
(window as any).modal2 = modal2;