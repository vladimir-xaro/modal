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

/***/ "./src/scss/Dev.scss":
/*!***************************!*\
  !*** ./src/scss/Dev.scss ***!
  \***************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/Modal.scss":
/*!*****************************!*\
  !*** ./src/scss/Modal.scss ***!
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

/***/ "./src/Backdrop.ts":
/*!*************************!*\
  !*** ./src/Backdrop.ts ***!
  \*************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Backdrop; }
/* harmony export */ });
/* harmony import */ var _xaro_event_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @xaro/event-emitter */ "./node_modules/@xaro/event-emitter/src/index.ts");
/* harmony import */ var _xaro_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @xaro/extend */ "./node_modules/@xaro/extend/index.js");
;

const defaults = {
    el: null,
    visible: false,
    mutation: 'animation',
    animation: null,
    timeout: null,
};
class Backdrop {
    constructor(config = {}) {
        Backdrop.instances.push(this);
        this.index = Backdrop.instances.length - 1;
        this.config = (0,_xaro_extend__WEBPACK_IMPORTED_MODULE_1__.default)({}, defaults, config);
        if (!this.config.el) {
            const el = document.createElement('div');
            el.classList.add('modal-backdrop');
            document.body.append(el);
            this.config.el = el;
        }
        this.emitter = new _xaro_event_emitter__WEBPACK_IMPORTED_MODULE_0__.default();
        this.__mutationEndListener = this.__mutationEndListener.bind(this);
        this.config.el.addEventListener('animationend', this.__mutationEndListener);
        this.config.el.addEventListener('transitionend', this.__mutationEndListener);
    }
    __mutationEndListener(event) {
        this.emitter.emit('mutationEnd', this, event);
    }
    mutationEndCallback() {
        this.config.animation = false;
    }
    unsubscribeMutation() {
        this.emitter.unsubscribe('mutationEnd');
    }
    addClass(animationType, classType) {
        // adding types class to this.config.el
    }
    removeClass(animationType, classType) {
        // removing types class from this.config.el
    }
}
Backdrop.instances = [];
Backdrop.current = null;


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
/* harmony import */ var _Backdrop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Backdrop */ "./src/Backdrop.ts");
;



class Modal {
    /**
     * Create Modal
     * @param config I_ModalConstructorConfig
     */
    constructor(config) {
        this.pending = false;
        Modal.instances.push();
        this.index = Modal.instances.length - 1;
        let _config = this.initConfig(_variables__WEBPACK_IMPORTED_MODULE_2__.defaults, config);
        this.config = _config;
        this.config.user = config;
        this.emitter = new _xaro_event_emitter__WEBPACK_IMPORTED_MODULE_0__.default(this.config.user.on);
        if (typeof config.el === 'string') {
            const el = document.querySelector(config.el);
            if (!el) {
                throw new Error("Element does not exists");
            }
            this.config.el = el;
        }
        if (!this.config.id) {
            this.config.id = this.config.el.getAttribute(this.config.attr.id) || 'modal-' + Modal.lastUndefinedId++;
        }
        this.backdrop = _Backdrop__WEBPACK_IMPORTED_MODULE_3__.default.instances.length ? _Backdrop__WEBPACK_IMPORTED_MODULE_3__.default.instances[_Backdrop__WEBPACK_IMPORTED_MODULE_3__.default.instances.length - 1] : new _Backdrop__WEBPACK_IMPORTED_MODULE_3__.default();
        // set container el
        if (!this.config.container.el) {
            const containerEl = this.config.el.querySelector('.modal__container');
            if (!containerEl) {
                throw new Error('[Modal] Container does not exists');
            }
            this.config.container.el = containerEl;
        }
        // close by data-attribute
        if (this.config.allow.closeAttr) {
            this.__closeAttrListener = this.__closeAttrListener.bind(this);
        }
        // close by escape key
        if (this.config.allow.closeEsc) {
            this.__closeEscListener = this.__closeEscListener.bind(this);
        }
        // add animation-/transition- end listener to container
        if (this.config.container.mutation) {
            this.__containerMutationEndListener = this.__containerMutationEndListener.bind(this);
            this.config.container.el.addEventListener(this.config.container.mutation + 'end', this.__containerMutationEndListener);
        }
        // trigger attr
        for (const el of document.querySelectorAll(`[${this.config.attr.target}]`)) {
            if (el.getAttribute(this.config.attr.target) === this.config.id) {
                el.addEventListener('click', () => this.show());
            }
        }
        // allow click outside container
        if (this.config.allow.closeOutside) {
            this.__wrapperClickListener = this.__wrapperClickListener.bind(this);
            this.config.el.addEventListener('click', this.__wrapperClickListener);
        }
        this.emitter.emit('init', this);
        if (this.config.visible) {
            this.show({ force: true });
        }
    }
    initConfig(origin, user) {
        let config = {};
        for (const key in origin) {
            if (user.hasOwnProperty(key)) {
                if ((0,_xaro_extend__WEBPACK_IMPORTED_MODULE_1__.isObject)(origin[key]) && (0,_xaro_extend__WEBPACK_IMPORTED_MODULE_1__.isObject)(user[key])) {
                    this.initConfig(origin[key], user[key]);
                }
                else {
                    config[key] = user[key];
                }
            }
            else {
                config[key] = origin[key];
            }
        }
        return config;
    }
    /** DOM wrapper click listener */
    __wrapperClickListener(event) {
        if (event.target === this.config.el) {
            this.hide();
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
    /** Animation/Transition container listener */
    __containerMutationEndListener(event) {
        this.emitter.emit('containerMutationEnd', this, event);
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
        this.config.container.animation = false;
        if (this.backdrop && this.backdrop.config.animation) {
            return;
        }
        this.pending = false;
        if (hide) {
            this.config.el.classList.remove(this.config.classes.visible);
            if (this.backdrop) {
                this.backdrop.config.el.classList.remove(this.config.backdrop.properties.classes.visible);
            }
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
        if (this.config.container.timeout) {
            clearTimeout(this.config.container.timeout);
        }
        if (this.backdrop && this.backdrop.config.timeout) {
            clearTimeout(this.backdrop.config.timeout);
        }
        const el = this.config.el;
        const container = this.config.container.el;
        if (this.pending) {
            if (this.config.container.mutation) {
                const key = this.config.container.mutation;
                container.classList.add(this.config.container.properties.classes[key].cancel);
            }
            if (this.backdrop && this.config.backdrop.mutation) {
                const key = this.config.backdrop.mutation;
                this.backdrop.config.el.classList.add(this.config.backdrop.properties.classes[key].cancel);
                this.backdrop.emitter.unsubscribe('mutationEnd');
            }
            this.emitter.unsubscribe('containerMutationEnd');
        }
        this.emitter.emit('beforeShow', this);
        this.config.visible = true;
        if (document.activeElement && document.hasFocus()) {
            Modal.blurEl = document.activeElement;
            document.activeElement.blur();
        }
        this.pending = true;
        if (this.config.container.mutation) {
            const key = this.config.container.mutation;
            container.classList.remove(this.config.container.properties.classes[key].hide, this.config.container.properties.classes[key].cancel);
        }
        if (this.backdrop && this.config.backdrop.mutation) {
            const key = this.config.backdrop.mutation;
            this.backdrop.config.el.classList.remove(this.config.backdrop.properties.classes[key].hide, this.config.backdrop.properties.classes[key].cancel);
        }
        el.classList.add(this.config.classes.visible);
        this.addListeners();
        if (this.config.container.mutation) {
            const key = this.config.container.mutation;
            this.config.container.animation = true;
            if (+this.config.container.timeouts[key] > 0) {
                this.config.container.timeout = setTimeout(() => {
                    container.classList.add(this.config.container.properties.classes[key].show);
                }, this.config.container.timeouts[key]);
            }
            else {
                container.classList.add(this.config.container.properties.classes[key].show);
            }
        }
        else {
            container.classList.add(this.config.container.properties.classes.common.show);
        }
        if (this.backdrop) {
            this.backdrop.config.el.classList.add(this.config.backdrop.properties.classes.visible);
            if (this.config.backdrop.mutation) {
                const key = this.config.backdrop.mutation;
                this.backdrop.config.animation = true;
                if (+this.config.backdrop.timeouts[key] > 0) {
                    this.backdrop.config.timeout = setTimeout(() => {
                        this.backdrop.config.el.classList.add(this.config.backdrop.properties.classes[key].show);
                    }, this.config.backdrop.timeouts[key]);
                }
                else {
                    this.backdrop.config.el.classList.add(this.config.backdrop.properties.classes[key].show);
                }
            }
            else {
                this.backdrop.config.el.classList.add(this.config.backdrop.properties.classes.common.show);
            }
        }
        if (!this.config.allow.bodyScroll) {
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
        }
        if (this.config.container.mutation) {
            this.emitter.once('containerMutationEnd', event => this.mutationEndCallback('container', 'backdrop', false, event));
        }
        // if (this.config.mutations.backdrop) {
        //   this.emitter.once('backdropMutationEnd', event => this.mutationEndCallback('backdrop', 'container', false, event));
        // }
        if (this.backdrop && this.config.backdrop.mutation) {
            // this.backdrop.emitter.once('mutationEnd', event => this.backdrop.)
        }
        if (!this.config.container.mutation && !this.config.backdrop.mutation) {
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
        if (this.config.container.timeout) {
            clearTimeout(this.config.container.timeout);
        }
        if (this.backdrop && this.backdrop.config.timeout) {
            clearTimeout(this.backdrop.config.timeout);
        }
        const el = this.config.el;
        const container = this.config.container.el;
        if (this.pending) {
            if (this.config.container.mutation) {
                const key = this.config.container.mutation;
                container.classList.add(this.config.container.properties.classes[key].cancel);
            }
            if (this.backdrop && this.config.backdrop.mutation) {
                const key = this.config.backdrop.mutation;
                this.backdrop.config.el.classList.add(this.config.backdrop.properties.classes[key].cancel);
                this.backdrop.emitter.unsubscribe('mutationEnd');
            }
            this.emitter.unsubscribe('containerMutationEnd');
        }
        this.emitter.emit('beforeHide', this);
        this.removeListeners();
        this.config.visible = false;
        this.pending = true;
        if (this.config.container.mutation) {
            const key = this.config.container.mutation;
            this.config.container.animation = true;
            container.classList.remove(this.config.container.properties.classes[key].show, this.config.container.properties.classes[key].cancel);
            container.classList.add(this.config.container.properties.classes[key].hide);
        }
        else {
            container.classList.remove(this.config.container.properties.classes.common.show);
        }
        if (this.backdrop) {
            if (this.config.backdrop.mutation) {
                const key = this.config.backdrop.mutation;
                this.backdrop.config.animation = true;
                this.backdrop.config.el.classList.remove(this.config.backdrop.properties.classes[key].show, this.config.backdrop.properties.classes[key].cancel);
                this.backdrop.config.el.classList.add(this.config.backdrop.properties.classes[key].hide);
            }
            else {
                this.backdrop.config.el.classList.remove(this.config.backdrop.properties.classes.common.show);
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
        if (this.config.container.mutation) {
            this.emitter.once('containerMutationEnd', event => this.mutationEndCallback('container', 'backdrop', true, event));
        }
        if (this.config.backdrop.mutation) {
            this.emitter.once('backdropMutationEnd', event => this.mutationEndCallback('backdrop', 'container', true, event));
        }
        if (!this.config.container.mutation && !this.config.backdrop.mutation) {
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
Modal.instances = [];
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
/* harmony import */ var _scss_Modal_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/Modal.scss */ "./src/scss/Modal.scss");
/* harmony import */ var _scss_Dev_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/Dev.scss */ "./src/scss/Dev.scss");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ */ "./src/index.ts");
;


const modal = new ___WEBPACK_IMPORTED_MODULE_2__.default({
    el: '.modal-1',
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
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaults": function() { return /* binding */ defaults; }
/* harmony export */ });
const defaults = {
    id: null,
    el: null,
    visible: false,
    attr: {
        close: 'data-modal-close',
        target: 'data-modal-target',
        id: 'data-modal-id',
    },
    allow: {
        bodyScroll: false,
        closeEsc: true,
        closeAttr: true,
        closeOutside: true,
    },
    classes: {
        visible: 'modal--visible',
    },
    container: {
        el: null,
        wrapper: null,
        mutation: 'animation',
        timeout: null,
        animation: false,
        timeouts: {
            animation: 0,
            transition: 100,
        },
        properties: {
            selector: '.modal__container',
            classes: {
                animation: {
                    cancel: 'modal-animation--cancel',
                    show: 'modal-animation-container--show',
                    hide: 'modal-animation-container--hide',
                },
                transition: {
                    cancel: 'modal-transition--cancel',
                    show: 'modal-transition-container--show',
                    hide: 'modal-transition-container--hide',
                },
                common: {
                    show: 'modal-container--hide',
                    hide: 'modal-container--hide',
                }
            }
        }
    },
    backdrop: {
        mutation: 'animation',
        timeouts: {
            animation: 0,
            transition: 50,
        },
        properties: {
            classes: {
                visible: 'modal-backdrop--visible',
                animation: {
                    cancel: 'modal-animation--cancel',
                    show: 'modal-animation-backdrop--show',
                    hide: 'modal-animation-backdrop--hide',
                },
                transition: {
                    cancel: 'modal-transition--cancel',
                    show: 'modal-transition-backdrop--show',
                    hide: 'modal-transition-backdrop--hide',
                },
                common: {
                    show: 'modal-backdrop--show',
                    hide: 'modal-backdrop--hide',
                }
            }
        }
    },
    user: {}
};


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