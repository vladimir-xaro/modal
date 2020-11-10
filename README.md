# @xaro/modal

TS Modal library with animations, transitions and events

## Usage

*file.html*
```html
<div class="modal">
	<div class="modal__backdrop" data-modal-close></div>
	<div class="modal__container">
		<button data-modal-close>Close</button>
	</div>
</div>
```
*file.ts*
```ts
import Modal from "@xaro/modal";

const modal = new Modal({
	el: document.querySelector('.modal') as HTMLElement
});

modal.show();
```