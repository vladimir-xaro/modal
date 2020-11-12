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
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var EventEmitter = /** @class */ (function () {
    /**
     * Create Emitter
     */
    function EventEmitter(on) {
        if (on === void 0) { on = {}; }
        /**
         * Event list
         */
        this.events = {};
        for (var key in on) {
            if (on[key]) {
                this.subscribe(key, on[key]);
            }
        }
    }
    /**
     * Creates a key for the event and subscribes the passed callback to it.
     */
    EventEmitter.prototype.subscribe = function (key, cb) {
        var e_1, _a;
        var _this = this;
        if (!this.has(key)) {
            this.events[key] = [];
        }
        var removes = [];
        if (Array.isArray(cb)) {
            try {
                for (var cb_1 = __values(cb), cb_1_1 = cb_1.next(); !cb_1_1.done; cb_1_1 = cb_1.next()) {
                    var _cb = cb_1_1.value;
                    removes.push.apply(removes, __spread(this.subscribe(key, _cb)));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (cb_1_1 && !cb_1_1.done && (_a = cb_1["return"])) _a.call(cb_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            this.events[key].push(cb);
            removes.push(function () { return _this.removeListener(key, cb); });
        }
        return removes;
    };
    /**
     * Unsubscribes all callback functions from the event and removes the event
     * key.
     */
    EventEmitter.prototype.unsubscribe = function () {
        var e_2, _a;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                if (this.events[key]) {
                    delete this.events[key];
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1["return"])) _a.call(keys_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    /**
     * Removes a specific event key callback function.
     */
    EventEmitter.prototype.removeListener = function (key, cb) {
        // if (typeof this.events[key] === 'object') {
        if (Array.isArray(this.events[key])) {
            var idx = this.events[key].indexOf(cb);
            if (idx > -1) {
                this.events[key].splice(idx, 1);
            }
        }
    };
    /**
     * Calls the callback function only once, and then removes it.
     */
    EventEmitter.prototype.once = function (key, cb) {
        var remove = this.subscribe(key, function () {
            var e_3, _a;
            remove[0]();
            if (Array.isArray(cb)) {
                try {
                    for (var cb_2 = __values(cb), cb_2_1 = cb_2.next(); !cb_2_1.done; cb_2_1 = cb_2.next()) {
                        var _cb = cb_2_1.value;
                        _cb();
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (cb_2_1 && !cb_2_1.done && (_a = cb_2["return"])) _a.call(cb_2);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            else {
                cb();
            }
        });
    };
    /**
     * Checks for an event by key.
     * (Doesn't check for callback functions)
     */
    EventEmitter.prototype.has = function (key) {
        return !!this.events[key];
    };
    /**
     * Returns the number of callback functions for the event key or "false" if
     * there is no key
     */
    EventEmitter.prototype.listenerCount = function (key) {
        if (!this.events.hasOwnProperty(key)) {
            return false;
        }
        return this.events[key].length;
    };
    /**
     * Calls all callback functions on events using the event key.
     */
    EventEmitter.prototype.emit = function (key) {
        var e_4, _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var event = this.events[key];
        if (event) {
            try {
                for (var event_1 = __values(event), event_1_1 = event_1.next(); !event_1_1.done; event_1_1 = event_1.next()) {
                    var cb = event_1_1.value;
                    cb.apply(void 0, __spread(args));
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (event_1_1 && !event_1_1.done && (_a = event_1["return"])) _a.call(event_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
    };
    /**
     * Just like "emit" calls all callback functions. However, the callback must
     * return a boolean value, which determines whether or not the next callback
     * will execute.
     * As a result, it returns the result of the last executed callback function.
     */
    EventEmitter.prototype.validateEmit = function (key) {
        var e_5, _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var event = this.events[key];
        if (!event) {
            return false;
        }
        try {
            for (var event_2 = __values(event), event_2_1 = event_2.next(); !event_2_1.done; event_2_1 = event_2.next()) {
                var cb = event_2_1.value;
                if (!cb.apply(void 0, __spread(args))) {
                    return false;
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (event_2_1 && !event_2_1.done && (_a = event_2["return"])) _a.call(event_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return true;
    };
    /**
     * Just like "emit" calls all callbacks, but unlike "emit" it passes the
     * result of the previous callback to the next one as an argument.
     * As aresult, it will return the result of the last callback.
     */
    EventEmitter.prototype.seriesEmit = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var event = this.events[key];
        if (!event) {
            return;
        }
        var params;
        for (var i = 0; i < event.length; i++) {
            if (i === 0) {
                params = event[i].apply(event, __spread(args));
            }
            else {
                params = event[i](params);
            }
        }
        return params;
    };
    return EventEmitter;
}());
/* harmony default export */ __webpack_exports__["default"] = (EventEmitter);


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
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _xaro_event_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @xaro/event-emitter */ "./node_modules/@xaro/event-emitter/src/index.ts");
/* harmony import */ var _xaro_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @xaro/extend */ "./node_modules/@xaro/extend/index.js");
/* harmony import */ var _variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./variables */ "./src/variables.ts");
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};



var Modal = /** @class */ (function () {
    /**
     * Create Modal
     * @param config I_ModalConstructorConfig
     */
    function Modal(config) {
        var e_1, _a;
        var _this = this;
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
            var el = document.querySelector(config.el);
            if (!el) {
                throw new Error("Element does not exists");
            }
            this.config.el = el;
        }
        if (!this.config.id) {
            this.config.id = this.config.el.getAttribute(this.config.attr.id) || 'modal-' + Modal.lastUndefinedId++;
        }
        if (!this.config.dom.backdrop) {
            this.config.dom.backdrop = this.config.el.querySelector('.modal__backdrop');
        }
        if (!this.config.dom.container) {
            var containerEl = this.config.el.querySelector('.modal__container');
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
        try {
            // trigger attr
            for (var _b = __values(document.querySelectorAll("[" + this.config.attr.target + "]")), _c = _b.next(); !_c.done; _c = _b.next()) {
                var el = _c.value;
                if (el.getAttribute(this.config.attr.target) === this.config.id) {
                    el.addEventListener('click', function () { return _this.show(); });
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.emitter.emit('init', this);
        if (this.config.visible) {
            this.show({ force: true });
        }
        // this.config.dom.backdrop?.addEventListener('mousewheel', (event) => console.log(event));
        this.config.el.addEventListener('click', function (event) { return console.log(event); });
    }
    /** DOM close attributes Listeners */
    Modal.prototype.__closeAttrListener = function (event) {
        this.hide();
        this.emitter.emit('closeAttrClick', this, event);
    };
    /** DOM Escape listener */
    Modal.prototype.__closeEscListener = function (event) {
        event.stopPropagation();
        if (event.code === 'Escape') {
            this.hide();
            this.emitter.emit('escKey', this, event);
        }
    };
    /** Animation/Transition listeners */
    Modal.prototype.__containerMutationEndListener = function (event) {
        this.emitter.emit('containerMutationEnd', this, event);
    };
    Modal.prototype.__backdropMutationEndListener = function (event) {
        this.emitter.emit('backdropMutationEnd', this, event);
    };
    /** Add DOM Event Listeners */
    Modal.prototype.addListeners = function () {
        var e_2, _a;
        // attr
        if (this.config.allow.closeAttr) {
            var closeEls = this.config.el.querySelectorAll("[" + this.config.attr.close + "]");
            try {
                for (var closeEls_1 = __values(closeEls), closeEls_1_1 = closeEls_1.next(); !closeEls_1_1.done; closeEls_1_1 = closeEls_1.next()) {
                    var el = closeEls_1_1.value;
                    el.addEventListener('click', this.__closeAttrListener);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (closeEls_1_1 && !closeEls_1_1.done && (_a = closeEls_1["return"])) _a.call(closeEls_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        // esc
        if (this.config.allow.closeEsc) {
            document.addEventListener('keyup', this.__closeEscListener);
        }
    };
    /** Remove DOM Event Listeners */
    Modal.prototype.removeListeners = function () {
        var e_3, _a;
        // attr
        if (this.config.allow.closeAttr) {
            var closeEls = this.config.el.querySelectorAll("[" + this.config.attr.close + "]");
            try {
                for (var closeEls_2 = __values(closeEls), closeEls_2_1 = closeEls_2.next(); !closeEls_2_1.done; closeEls_2_1 = closeEls_2.next()) {
                    var el = closeEls_2_1.value;
                    el.removeEventListener('click', this.__closeAttrListener);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (closeEls_2_1 && !closeEls_2_1.done && (_a = closeEls_2["return"])) _a.call(closeEls_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        // esc
        if (this.config.allow.closeEsc) {
            document.removeEventListener('keyup', this.__closeEscListener);
        }
    };
    /** show/hide mutation end callback */
    Modal.prototype.mutationEndCallback = function (key1, key2, hide, event) {
        this.animation[key1] = false;
        if (this.config.dom[key2] && this.animation[key2]) {
            return;
        }
        this.pending = false;
        if (hide) {
            this.config.el.classList.remove(this.config.classes.visible);
        }
        this.emitter.emit('after' + hide ? 'Hide' : 0, this, event);
    };
    /**
     * Show modal
     * @param config I_ModalDisplayConfig
     */
    Modal.prototype.show = function (config) {
        var _this = this;
        if (this.config.visible) {
            if (!(config === null || config === void 0 ? void 0 : config.force)) {
                return;
            }
        }
        for (var key in this.timeout) {
            if (this.timeout[key]) {
                clearTimeout(this.timeout[key]);
            }
        }
        var el = this.config.el;
        var container = this.config.dom.container;
        var backdrop = this.config.dom.backdrop;
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
            var key = this.config.mutations.container;
            container.classList.remove(this.config.classes[key].hide.container, this.config.classes[key].cancel);
        }
        if (backdrop && this.config.mutations.backdrop) {
            var key = this.config.mutations.backdrop;
            backdrop.classList.remove(this.config.classes[key].hide.backdrop, this.config.classes[key].cancel);
        }
        el.classList.add(this.config.classes.visible);
        if (this.config.mutations.container) {
            var key_1 = this.config.mutations.container;
            this.animation.container = true;
            if (+this.config.timeout.container[key_1] > 0) {
                this.timeout.container = setTimeout(function () {
                    container.classList.add(_this.config.classes[key_1].show.container);
                }, this.config.timeout.container[key_1]);
            }
            else {
                container.classList.add(this.config.classes[key_1].show.container);
            }
        }
        else {
            container.classList.add(this.config.classes.common.show.container);
        }
        if (backdrop) {
            if (this.config.mutations.backdrop) {
                var key_2 = this.config.mutations.backdrop;
                this.animation.backdrop = true;
                if (+this.config.timeout.backdrop[key_2] > 0) {
                    this.timeout.backdrop = setTimeout(function () {
                        backdrop.classList.add(_this.config.classes[key_2].show.backdrop);
                    }, this.config.timeout.backdrop[key_2]);
                }
                else {
                    backdrop.classList.add(this.config.classes[key_2].show.backdrop);
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
            this.emitter.once('containerMutationEnd', function (event) { return _this.mutationEndCallback('container', 'backdrop', false, event); });
        }
        if (this.config.mutations.backdrop) {
            this.emitter.once('backdropMutationEnd', function (event) { return _this.mutationEndCallback('backdrop', 'container', false, event); });
        }
        if (!this.config.mutations.container && !this.config.mutations.backdrop) {
            this.emitter.emit('afterShow', this);
        }
    };
    /**
     * Hide modal
     * @param config I_ModalDisplayConfig
     */
    Modal.prototype.hide = function (config) {
        var _this = this;
        if (!this.config.visible) {
            if (!(config === null || config === void 0 ? void 0 : config.force)) {
                return;
            }
        }
        for (var key in this.timeout) {
            if (this.timeout[key]) {
                clearTimeout(this.timeout[key]);
            }
        }
        var el = this.config.el;
        var container = this.config.dom.container;
        var backdrop = this.config.dom.backdrop;
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
            var key = this.config.mutations.container;
            this.animation.container = true;
            container.classList.remove(this.config.classes[key].show.container, this.config.classes[key].cancel);
            container.classList.add(this.config.classes[key].hide.container);
        }
        else {
            container.classList.remove(this.config.classes.common.show.container);
        }
        if (backdrop) {
            if (this.config.mutations.backdrop) {
                var key = this.config.mutations.backdrop;
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
            this.emitter.once('containerMutationEnd', function (event) { return _this.mutationEndCallback('container', 'backdrop', true, event); });
        }
        if (this.config.mutations.backdrop) {
            this.emitter.once('backdropMutationEnd', function (event) { return _this.mutationEndCallback('backdrop', 'container', true, event); });
        }
        if (!this.config.mutations.container && !this.config.mutations.backdrop) {
            el.classList.remove(this.config.classes.visible);
            this.emitter.emit('afterHide', this);
        }
    };
    /**
     * Toggle display modal
     * @param config I_ModalDisplayConfig
     */
    Modal.prototype.toggle = function (config) {
        this.config.visible ? this.hide(config) : this.show(config);
    };
    Modal.blurEl = null;
    Modal.lastUndefinedId = 0;
    return Modal;
}());
/* harmony default export */ __webpack_exports__["default"] = (Modal);


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


var modal = new ___WEBPACK_IMPORTED_MODULE_2__.default({
    el: '.modal-1',
    // mutations: {
    //   container:  'transition',
    //   backdrop:   'transition'
    // },
    visible: true,
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
var defaults = {
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
        backdrop: '.modal__backdrop',
        container: '.modal__container',
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