/******/ (function() { // webpackBootstrap
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ extend; },
/* harmony export */   "isObject": function() { return /* binding */ isObject; }
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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ EventEmitter; }
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
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ "./node_modules/@xaro/event-emitter/src/EventEmitter.ts");
;
/* harmony default export */ __webpack_exports__["default"] = (_EventEmitter__WEBPACK_IMPORTED_MODULE_0__.default);


/***/ }),

/***/ "./src/Modal.ts":
/*!**********************!*\
  !*** ./src/Modal.ts ***!
  \**********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Modal; }
/* harmony export */ });
/* harmony import */ var _xaro_event_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @xaro/event-emitter */ "./node_modules/@xaro/event-emitter/src/index.ts");
/* harmony import */ var _xaro_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @xaro/extend */ "./node_modules/@xaro/extend/index.js");
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./variables */ "./src/variables.ts");
;


class Modal {
    /**
     * Create Modal
     * @param config I_ModalConstructorConfig
     */
    constructor(config) {
        this.pending = false;
        this.animation = {
            container: false,
            backdrop: false
        };
        this.timeout = {
            container: undefined,
            backdrop: undefined
        };
        this.emitter = new _xaro_event_emitter__WEBPACK_IMPORTED_MODULE_0__.default(config.on);
        this.config = (0,_xaro_extend__WEBPACK_IMPORTED_MODULE_1__.default)({}, _variables__WEBPACK_IMPORTED_MODULE_2__.defaults, config);
        if (typeof config.el === 'string') {
            this.config.el = document.querySelector(config.el);
        }
        if (!this.config.el) {
            throw new Error("Element does not exists");
        }
        if (!this.config.id) {
            this.config.id = this.config.el.getAttribute(this.config.attr.id) || 'modal-' + Modal.lastUndefinedId++;
        }
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
        if (this.config.allow.closeAttr) {
            this.__closeAttrListener = this.__closeAttrListener.bind(this);
        }
        if (this.config.allow.closeEsc) {
            this.__closeEscListener = this.__closeEscListener.bind(this);
        }
        if (this.config.mutations.container) {
            this.__containerMutationEndListener = this.__containerMutationEndListener.bind(this);
            this.config.dom.container.addEventListener(this.config.mutations.container + 'end', this.__containerMutationEndListener);
        }
        if (this.config.dom.backdrop && this.config.mutations.backdrop) {
            this.__backdropMutationEndListener = this.__backdropMutationEndListener.bind(this);
            this.config.dom.backdrop.addEventListener(this.config.mutations.backdrop + 'end', this.__backdropMutationEndListener);
        }
        // trigger attr
        for (const el of document.querySelectorAll(`[${this.config.attr.target}]`)) {
            if (el.getAttribute(this.config.attr.target) === this.config.id) {
                el.addEventListener('click', () => this.show());
            }
        }
        this.emitter.emit('init', this);
        if (this.config.visible) {
            this.show({ force: true });
        }
    }
    /** DOM close attributes Listeners */
    __closeAttrListener(event) {
        this.hide();
        this.emitter.emit('closeAttrClick', this, event);
    }
    /** DOM Escape listener */
    __closeEscListener(event) {
        event.stopPropagation();
        if (event.code === 'Escape') {
            this.hide();
            this.emitter.emit('escKey', this, event);
        }
    }
    /** Animation/Transition listeners */
    __containerMutationEndListener(event) {
        this.emitter.emit('containerMutationEnd', this, event);
    }
    __backdropMutationEndListener(event) {
        this.emitter.emit('backdropMutationEnd', this, event);
    }
    /** Add DOM Event Listeners */
    addListeners() {
        // attr
        if (this.config.allow.closeAttr) {
            const closeEls = this.config.el.querySelectorAll(`[${this.config.attr.close}]`);
            for (const el of closeEls) {
                el.addEventListener('click', this.__closeAttrListener);
            }
        }
        // esc
        if (this.config.allow.closeEsc) {
            document.addEventListener('keyup', this.__closeEscListener);
        }
    }
    /** Remove DOM Event Listeners */
    removeListeners() {
        // attr
        if (this.config.allow.closeAttr) {
            const closeEls = this.config.el.querySelectorAll(`[${this.config.attr.close}]`);
            for (const el of closeEls) {
                el.removeEventListener('click', this.__closeAttrListener);
            }
        }
        // esc
        if (this.config.allow.closeEsc) {
            document.removeEventListener('keyup', this.__closeEscListener);
        }
    }
    /** show/hide mutation end callback */
    mutationEndCallback(key1, key2, hide, event) {
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
    /**
     * Show modal
     * @param config I_ModalDisplayConfig
     */
    show(config) {
        if (this.config.visible) {
            if (!config?.force) {
                return;
            }
        }
        for (const key in this.timeout) {
            if (this.timeout[key]) {
                clearTimeout(this.timeout[key]);
            }
        }
        const el = this.config.el;
        const container = this.config.dom.container;
        const backdrop = this.config.dom.backdrop;
        if (this.pending) {
            if (this.config.mutations.container) {
                container.classList.add(this.config.classes[this.config.mutations.container].cancel);
            }
            if (backdrop && this.config.mutations.backdrop) {
                backdrop.classList.add(this.config.classes[this.config.mutations.backdrop].cancel);
            }
            this.emitter.unsubscribe('containerMutationEnd', 'backdropMutationEnd');
        }
        this.emitter.emit('beforeShow', this);
        this.config.visible = true;
        if (document.activeElement && document.hasFocus()) {
            Modal.blurEl = document.activeElement;
            document.activeElement.blur();
        }
        this.pending = true;
        if (this.config.mutations.container) {
            const key = this.config.mutations.container;
            container.classList.remove(this.config.classes[key].hide.container, this.config.classes[key].cancel);
        }
        if (backdrop && this.config.mutations.backdrop) {
            const key = this.config.mutations.backdrop;
            backdrop.classList.remove(this.config.classes[key].hide.backdrop, this.config.classes[key].cancel);
        }
        el.classList.add(this.config.classes.visible);
        if (this.config.mutations.container) {
            const key = this.config.mutations.container;
            this.animation.container = true;
            if (+this.config.timeout.container[key] > 0) {
                this.timeout.container = setTimeout(() => {
                    container.classList.add(this.config.classes[key].show.container);
                }, this.config.timeout.container[key]);
            }
            else {
                container.classList.add(this.config.classes[key].show.container);
            }
        }
        else {
            container.classList.add(this.config.classes.common.show.container);
        }
        if (backdrop) {
            if (this.config.mutations.backdrop) {
                const key = this.config.mutations.backdrop;
                this.animation.backdrop = true;
                if (+this.config.timeout.backdrop[key] > 0) {
                    this.timeout.backdrop = setTimeout(() => {
                        backdrop.classList.add(this.config.classes[key].show.backdrop);
                    }, this.config.timeout.backdrop[key]);
                }
                else {
                    backdrop.classList.add(this.config.classes[key].show.backdrop);
                }
            }
            else {
                backdrop.classList.add(this.config.classes.common.show.backdrop);
            }
        }
        this.addListeners();
        if (!this.config.allow.bodyScroll) {
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
        }
        if (this.config.mutations.container) {
            this.emitter.once('containerMutationEnd', event => this.mutationEndCallback('container', 'backdrop', false, event));
        }
        if (this.config.mutations.backdrop) {
            this.emitter.once('backdropMutationEnd', event => this.mutationEndCallback('backdrop', 'container', false, event));
        }
        if (!this.config.mutations.container && !this.config.mutations.backdrop) {
            this.emitter.emit('afterShow', this);
        }
    }
    /**
     * Hide modal
     * @param config I_ModalDisplayConfig
     */
    hide(config) {
        if (!this.config.visible) {
            if (!config?.force) {
                return;
            }
        }
        for (const key in this.timeout) {
            if (this.timeout[key]) {
                clearTimeout(this.timeout[key]);
            }
        }
        const el = this.config.el;
        const container = this.config.dom.container;
        const backdrop = this.config.dom.backdrop;
        if (this.pending) {
            if (this.config.mutations.container) {
                container.classList.add(this.config.classes[this.config.mutations.container].cancel);
            }
            if (backdrop && this.config.mutations.backdrop) {
                backdrop.classList.add(this.config.classes[this.config.mutations.backdrop].cancel);
            }
            this.emitter.unsubscribe('containerMutationEnd', 'backdropMutationEnd');
        }
        this.emitter.emit('beforeHide', this);
        this.removeListeners();
        this.config.visible = false;
        this.pending = true;
        if (this.config.mutations.container) {
            const key = this.config.mutations.container;
            this.animation.container = true;
            container.classList.remove(this.config.classes[key].show.container, this.config.classes[key].cancel);
            container.classList.add(this.config.classes[key].hide.container);
        }
        else {
            container.classList.remove(this.config.classes.common.show.container);
        }
        if (backdrop) {
            if (this.config.mutations.backdrop) {
                const key = this.config.mutations.backdrop;
                this.animation.backdrop = true;
                backdrop.classList.remove(this.config.classes[key].show.backdrop, this.config.classes[key].cancel);
                backdrop.classList.add(this.config.classes[key].hide.backdrop);
            }
            else {
                backdrop.classList.remove(this.config.classes.common.show.backdrop);
            }
        }
        if (Modal.blurEl) {
            Modal.blurEl.focus();
        }
        Modal.blurEl = null;
        if (!this.config.allow.bodyScroll) {
            document.body.style.overflow = '';
            document.body.style.height = '';
        }
        if (this.config.mutations.container) {
            this.emitter.once('containerMutationEnd', event => this.mutationEndCallback('container', 'backdrop', true, event));
        }
        if (this.config.mutations.backdrop) {
            this.emitter.once('backdropMutationEnd', event => this.mutationEndCallback('backdrop', 'container', true, event));
        }
        if (!this.config.mutations.container && !this.config.mutations.backdrop) {
            el.classList.remove(this.config.classes.visible);
            this.emitter.emit('afterHide', this);
        }
    }
    /**
     * Toggle display modal
     * @param config I_ModalDisplayConfig
     */
    toggle(config) {
        this.config.visible ? this.hide(config) : this.show(config);
    }
}
Modal.blurEl = null;
Modal.lastUndefinedId = 0;


/***/ }),

/***/ "./src/index.dev.ts":
/*!**************************!*\
  !*** ./src/index.dev.ts ***!
  \**************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss */ "./src/scss/index.scss");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/index.ts");
;

const modal1 = new ___WEBPACK_IMPORTED_MODULE_1__.default({
    id: 'test',
    // el: document.querySelector('.modal-1') as HTMLElement,
    el: '.modal-1',
    // visible: true,
    // animations: true,
    // transitions: true,
    mutations: {
        container: 'transition',
        backdrop: 'transition',
    },
    timeout: {
        container: {
            animation: 100,
            transition: 250
        },
        backdrop: {
            animation: 0,
            transition: 50
        },
    },
    attr: {
        close: 'data-close',
        target: 'data-target',
        id: 'data-id',
    },
    allow: {
        bodyScroll: true,
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
window.modal1 = modal1;
// (window as any).modal2 = modal2;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal */ "./src/Modal.ts");
;
/* harmony default export */ __webpack_exports__["default"] = (_Modal__WEBPACK_IMPORTED_MODULE_0__.default);


/***/ }),

/***/ "./src/variables.ts":
/*!**************************!*\
  !*** ./src/variables.ts ***!
  \**************************/
/*! namespace exports */
/*! export defaults [provided] [no usage info] [missing usage info prevents renaming] */
/*! export mutations [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaults": function() { return /* binding */ defaults; },
/* harmony export */   "mutations": function() { return /* binding */ mutations; }
/* harmony export */ });
const defaults = {
    id: null,
    el: null,
    dom: {
        backdrop: null,
        container: null,
    },
    visible: false,
    mutations: {
        container: 'animation',
        backdrop: 'animation',
    },
    timeout: {
        container: {
            animation: 0,
            transition: 100,
        },
        backdrop: {
            animation: 0,
            transition: 50,
        }
    },
    attr: {
        close: 'data-modal-close',
        target: 'data-modal-target',
        id: 'data-modal-id',
    },
    allow: {
        bodyScroll: false,
        closeEsc: true,
        closeAttr: true,
    },
    selector: {
        container: '.modal__container',
        backdrop: '.modal__backdrop',
        btnClose: '.modal__btn-close',
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
        },
        transition: {
            cancel: 'modal-transition--cancel',
            show: {
                container: 'modal-transition-container--show',
                backdrop: 'modal-transition-backdrop--show',
            },
            hide: {
                container: 'modal-transition-container--hide',
                backdrop: 'modal-transition-backdrop--hide',
            }
        },
        common: {
            show: {
                container: 'modal-container--show',
                backdrop: 'modal-backdrop--show',
            },
            hide: {
                container: 'modal-container--hide',
                backdrop: 'modal-backdrop--hide',
            }
        }
    }
};
const mutations = ['animation', 'transition', false];


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
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.dev.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=Modal.dev.js.map