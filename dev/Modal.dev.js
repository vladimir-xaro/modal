/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@xaro/extend/index.js":
/*!********************************************!*\
  !*** ./node_modules/@xaro/extend/index.js ***!
  \********************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isObject [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ extend,
/* harmony export */   "isObject": () => /* binding */ isObject
/* harmony export */ });
function extend(...args) {
  const to = Object(args[0]);
  for (let i = 1; i < args.length; i += 1) {
    const nextSource = args[i];
    if (nextSource !== undefined && nextSource !== null) {
      const keysArray = Object.keys(Object(nextSource));
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            extend(to[nextKey], nextSource[nextKey]);
          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            to[nextKey] = {};
            extend(to[nextKey], nextSource[nextKey]);
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}

function isObject(o) {
  return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
}

/***/ }),

/***/ "./src/scss/index.scss":
/*!*****************************!*\
  !*** ./src/scss/index.scss ***!
  \*****************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/@xaro/event-emitter/src/EventEmitter.ts":
/*!**************************************************************!*\
  !*** ./node_modules/@xaro/event-emitter/src/EventEmitter.ts ***!
  \**************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ EventEmitter
/* harmony export */ });
class EventEmitter {
    /**
     * Create Emitter
     */
    constructor(on = {}) {
        /**
         * Event list
         */
        this.events = {};
        for (let key in on) {
            if (on[key]) {
                this.subscribe(key, on[key]);
            }
        }
    }
    /**
     * Creates a key for the event and subscribes the passed callback to it.
     */
    subscribe(key, cb) {
        if (!this.has(key)) {
            this.events[key] = [];
        }
        let removes = [];
        if (Array.isArray(cb)) {
            for (const _cb of cb) {
                removes.push(...this.subscribe(key, _cb));
            }
        }
        else {
            this.events[key].push(cb);
            removes.push(() => this.removeListener(key, cb));
        }
        return removes;
    }
    /**
     * Unsubscribes all callback functions from the event and removes the event
     * key.
     */
    unsubscribe(...keys) {
        for (const key of keys) {
            if (this.events[key]) {
                delete this.events[key];
            }
        }
    }
    /**
     * Removes a specific event key callback function.
     */
    removeListener(key, cb) {
        // if (typeof this.events[key] === 'object') {
        if (Array.isArray(this.events[key])) {
            const idx = this.events[key].indexOf(cb);
            if (idx > -1) {
                this.events[key].splice(idx, 1);
            }
        }
    }
    /**
     * Calls the callback function only once, and then removes it.
     */
    once(key, cb) {
        const remove = this.subscribe(key, () => {
            remove[0]();
            if (Array.isArray(cb)) {
                for (const _cb of cb) {
                    _cb();
                }
            }
            else {
                cb();
            }
        });
    }
    /**
     * Checks for an event by key.
     * (Doesn't check for callback functions)
     */
    has(key) {
        return !!this.events[key];
    }
    /**
     * Returns the number of callback functions for the event key or "false" if
     * there is no key
     */
    listenerCount(key) {
        if (!this.events.hasOwnProperty(key)) {
            return false;
        }
        return this.events[key].length;
    }
    /**
     * Calls all callback functions on events using the event key.
     */
    emit(key, ...args) {
        const event = this.events[key];
        if (event) {
            for (let cb of event) {
                cb(...args);
            }
        }
    }
    /**
     * Just like "emit" calls all callback functions. However, the callback must
     * return a boolean value, which determines whether or not the next callback
     * will execute.
     * As a result, it returns the result of the last executed callback function.
     */
    validateEmit(key, ...args) {
        const event = this.events[key];
        if (!event) {
            return false;
        }
        for (const cb of event) {
            if (!cb(...args)) {
                return false;
            }
        }
        return true;
    }
    /**
     * Just like "emit" calls all callbacks, but unlike "emit" it passes the
     * result of the previous callback to the next one as an argument.
     * As aresult, it will return the result of the last callback.
     */
    seriesEmit(key, ...args) {
        const event = this.events[key];
        if (!event) {
            return;
        }
        let params;
        for (let i = 0; i < event.length; i++) {
            if (i === 0) {
                params = event[i](...args);
            }
            else {
                params = event[i](params);
            }
        }
        return params;
    }
}


/***/ }),

/***/ "./node_modules/@xaro/event-emitter/src/index.ts":
/*!*******************************************************!*\
  !*** ./node_modules/@xaro/event-emitter/src/index.ts ***!
  \*******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ "./node_modules/@xaro/event-emitter/src/EventEmitter.ts");
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_EventEmitter__WEBPACK_IMPORTED_MODULE_0__.default);


/***/ }),

/***/ "./src/Modal.ts":
/*!**********************!*\
  !*** ./src/Modal.ts ***!
  \**********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Modal
/* harmony export */ });
/* harmony import */ var _xaro_event_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @xaro/event-emitter */ "./node_modules/@xaro/event-emitter/src/index.ts");
/* harmony import */ var _xaro_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @xaro/extend */ "./node_modules/@xaro/extend/index.js");
;

const defaults = {
    el: null,
    dom: {
        backdrop: null,
        container: null
    },
    visible: false,
    animate: true,
    allow: {
        closeEsc: true,
        closeAttr: true,
        animateContainer: true,
        animateBackdrop: true
    },
    selector: {
        container: '.modal__container',
        backdrop: '.modal__backdrop',
        closeBtn: '.modal__btn-close'
    },
    classes: {
        visible: 'modal--visible',
        animation: {
            cancel: 'modal-animation--cancel',
            show: {
                container: 'modal-animation-container--show',
                backdrop: 'modal-animation-backdrop--show',
            },
            hide: {
                container: 'modal-animation-container--hide',
                backdrop: 'modal-animation-backdrop--hide',
            }
        }
    },
    closeAttr: '[data-modal-close]'
};
class Modal {
    constructor(config) {
        this.pending = false;
        this.animation = {
            container: false,
            backdrop: false
        };
        this.emitter = new _xaro_event_emitter__WEBPACK_IMPORTED_MODULE_0__.default(config.on);
        this.config = (0,_xaro_extend__WEBPACK_IMPORTED_MODULE_1__.default)(defaults, config);
        if (!this.config.dom.backdrop) {
            this.config.dom.backdrop = this.config.el.querySelector('.modal__backdrop');
        }
        if (!this.config.dom.container) {
            const containerEl = this.config.el.querySelector('.modal__container');
            if (!containerEl) {
                throw new Error('[Modal] Container does not exists');
            }
            this.config.dom.container = containerEl;
        }
        this.__closeAttrListener = this.__closeAttrListener.bind(this);
        this.__closeEscListener = this.__closeEscListener.bind(this);
        if (this.config.animate) {
            this.__containerAnimationEndListener = this.__containerAnimationEndListener.bind(this);
            this.__backdropAnimationEndListener = this.__backdropAnimationEndListener.bind(this);
            this.config.dom.container.addEventListener('animationend', this.__containerAnimationEndListener);
            this.config.dom.backdrop?.addEventListener('animationend', this.__backdropAnimationEndListener);
        }
    }
    /** DOM Event Listeners */
    __closeAttrListener(event) {
        this.hide();
        this.emitter.emit('closeAttrClick', this, event);
    }
    __closeEscListener(event) {
        event.stopPropagation();
        if (event.code === 'Escape') {
            this.hide();
            this.emitter.emit('escKey', this, event);
        }
    }
    __containerAnimationEndListener(event) {
        this.emitter.emit('containerAnimationEnd', this, event);
    }
    __backdropAnimationEndListener(event) {
        this.emitter.emit('backdropAnimationEnd', this, event);
    }
    /** Add DOM Event Listeners */
    addListeners() {
        // attr
        const closeEls = this.config.el.querySelectorAll(this.config.closeAttr);
        for (const el of closeEls) {
            el.addEventListener('click', this.__closeAttrListener);
        }
        // esc
        document.addEventListener('keyup', this.__closeEscListener);
    }
    /** Remove DOM Event Listeners */
    removeListeners() {
        // attr
        const closeEls = this.config.el.querySelectorAll(this.config.closeAttr);
        for (const el of closeEls) {
            el.removeEventListener('click', this.__closeAttrListener);
        }
        // esc
        document.removeEventListener('keyup', this.__closeEscListener);
    }
    /** show/hide animation end */
    animationEndCallback(key1, key2, hide, event) {
        console.log('animationEndCallback', key1);
        this.animation[key1] = false;
        if (this.config.dom[key2] && this.animation[key2]) {
            return;
        }
        this.pending = false;
        if (hide) {
            this.config.el.classList.remove(this.config.classes.visible);
        }
        this.emitter.emit('after' + hide ? 'Hide' : 0, this, event);
    }
    get visible() {
        return this.config.visible;
    }
    set visible(newValue) {
        this.config.visible = !!newValue;
    }
    show(config) {
        if (this.visible) {
            return;
        }
        const el = this.config.el;
        const container = this.config.dom.container;
        const backdrop = this.config.dom.backdrop;
        if (this.pending) {
            container.classList.add(this.config.classes.animation.cancel);
            backdrop && backdrop.classList.add(this.config.classes.animation.cancel);
            this.emitter.unsubscribe('containerAnimationEnd', 'backdropAnimationEnd');
        }
        this.emitter.emit('beforeShow', this);
        this.visible = true;
        if (document.activeElement && document.hasFocus()) {
            Modal.blurEl = document.activeElement;
            document.activeElement.blur();
        }
        if (this.config.animate) {
            this.pending = true;
            container.classList.remove(this.config.classes.animation.hide.container, this.config.classes.animation.cancel);
            backdrop?.classList.remove(this.config.classes.animation.hide.backdrop, this.config.classes.animation.cancel);
        }
        el.classList.add(this.config.classes.visible);
        if (this.config.animate) {
            this.animation.container = true;
            container.classList.add(this.config.classes.animation.show.container);
            if (backdrop) {
                this.animation.backdrop = true;
                backdrop.classList.add(this.config.classes.animation.show.backdrop);
            }
        }
        this.addListeners();
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        if (this.config.animate) {
            this.emitter.once('containerAnimationEnd', event => this.animationEndCallback('container', 'backdrop', false, event));
            this.emitter.once('backdropAnimationEnd', event => this.animationEndCallback('backdrop', 'container', false, event));
        }
        else {
            this.emitter.emit('afterShow', this);
        }
    }
    hide(config) {
        if (!this.visible) {
            return;
        }
        const el = this.config.el;
        const container = this.config.dom.container;
        const backdrop = this.config.dom.backdrop;
        if (this.pending) {
            container.classList.add(this.config.classes.animation.cancel);
            backdrop?.classList.add(this.config.classes.animation.cancel);
            this.emitter.unsubscribe('containerAnimationEnd', 'backdropAnimationEnd');
            this.pending = false;
        }
        this.emitter.emit('beforeHide', this);
        this.removeListeners();
        this.visible = false;
        if (this.config.animate) {
            this.pending = true;
            this.animation.container = true;
            container.classList.remove(this.config.classes.animation.show.container, this.config.classes.animation.cancel);
            if (backdrop) {
                this.animation.backdrop = true;
                backdrop.classList.remove(this.config.classes.animation.show.backdrop, this.config.classes.animation.cancel);
                backdrop.classList.add(this.config.classes.animation.hide.backdrop);
            }
            container.classList.add(this.config.classes.animation.hide.container);
        }
        if (Modal.blurEl) {
            Modal.blurEl.focus();
        }
        Modal.blurEl = null;
        document.body.style.overflow = '';
        document.body.style.height = '';
        if (this.config.animate) {
            this.emitter.once('backdropAnimationEnd', event => this.animationEndCallback('backdrop', 'container', true, event));
            this.emitter.once('containerAnimationEnd', event => this.animationEndCallback('container', 'backdrop', true, event));
        }
        else {
            this.emitter.emit('afterHide', this);
            el.classList.remove(this.config.classes.visible);
        }
    }
}
Modal.blurEl = null;


/***/ }),

/***/ "./src/index.dev.ts":
/*!**************************!*\
  !*** ./src/index.dev.ts ***!
  \**************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss */ "./src/scss/index.scss");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/index.ts");
;

const modal = new ___WEBPACK_IMPORTED_MODULE_1__.default({
    el: document.querySelector('.modal'),
    allow: {
        closeEsc: true
    },
    // animate: false,
    on: {
        init: (modal) => {
        },
        afterShow: (modal) => {
            console.log('[Modal] afterShow');
        }
    }
});
document.querySelector('.btn')?.addEventListener('click', () => {
    modal.show();
});
window.modal = modal;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal */ "./src/Modal.ts");
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Modal__WEBPACK_IMPORTED_MODULE_0__.default);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.dev.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=Modal.dev.js.map