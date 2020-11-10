(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Modal"] = factory();
	else
		root["Modal"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 458:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ src_0; }
});

// CONCATENATED MODULE: ./node_modules/@xaro/event-emitter/src/EventEmitter.ts
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
/* harmony default export */ var src_EventEmitter = (EventEmitter);

// CONCATENATED MODULE: ./node_modules/@xaro/event-emitter/src/index.ts
;
/* harmony default export */ var src = (src_EventEmitter);

// CONCATENATED MODULE: ./node_modules/@xaro/extend/index.js
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
// CONCATENATED MODULE: ./src/Modal.ts
var Modal_values = (undefined && undefined.__values) || function(o) {
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


var defaults = {
    el: null,
    dom: {
        backdrop: null,
        container: null
    },
    visible: false,
    animations: true,
    transitions: false,
    closeAttr: 'data-modal-close',
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
        }
    }
};
var Modal = /** @class */ (function () {
    function Modal(config) {
        var _a, _b;
        this.pending = false;
        this.animation = {
            container: false,
            backdrop: false
        };
        this.emitter = new src(config.on);
        this.config = extend(defaults, config);
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
        this.__closeAttrListener = this.__closeAttrListener.bind(this);
        this.__closeEscListener = this.__closeEscListener.bind(this);
        if (this.config.animations) {
            this.__containerAnimationEndListener = this.__containerAnimationEndListener.bind(this);
            this.__backdropAnimationEndListener = this.__backdropAnimationEndListener.bind(this);
            this.config.dom.container.addEventListener('animationend', this.__containerAnimationEndListener);
            (_a = this.config.dom.backdrop) === null || _a === void 0 ? void 0 : _a.addEventListener('animationend', this.__backdropAnimationEndListener);
        }
        else if (this.config.transitions) {
            this.__containerTransitionEndListener = this.__containerTransitionEndListener.bind(this);
            this.__backdropTransitionEndListener = this.__backdropTransitionEndListener.bind(this);
            this.config.dom.container.addEventListener('transitionend', this.__containerTransitionEndListener);
            (_b = this.config.dom.backdrop) === null || _b === void 0 ? void 0 : _b.addEventListener('transitionend', this.__backdropTransitionEndListener);
        }
    }
    /** DOM Event Listeners */
    Modal.prototype.__closeAttrListener = function (event) {
        this.hide();
        this.emitter.emit('closeAttrClick', this, event);
    };
    Modal.prototype.__closeEscListener = function (event) {
        event.stopPropagation();
        if (event.code === 'Escape') {
            this.hide();
            this.emitter.emit('escKey', this, event);
        }
    };
    /** Animations listeners */
    Modal.prototype.__containerAnimationEndListener = function (event) {
        this.emitter.emit('containerAnimationEnd', this, event);
    };
    Modal.prototype.__backdropAnimationEndListener = function (event) {
        this.emitter.emit('backdropAnimationEnd', this, event);
    };
    /** Transitions listeners */
    Modal.prototype.__containerTransitionEndListener = function (event) {
        this.emitter.emit('containerTransitionEnd', this, event);
    };
    Modal.prototype.__backdropTransitionEndListener = function (event) {
        this.emitter.emit('backdropTransitionEnd', this, event);
    };
    /** Add DOM Event Listeners */
    Modal.prototype.addListeners = function () {
        var e_1, _a;
        // attr
        var closeEls = this.config.el.querySelectorAll("[" + this.config.closeAttr + "]");
        try {
            for (var closeEls_1 = Modal_values(closeEls), closeEls_1_1 = closeEls_1.next(); !closeEls_1_1.done; closeEls_1_1 = closeEls_1.next()) {
                var el = closeEls_1_1.value;
                el.addEventListener('click', this.__closeAttrListener);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (closeEls_1_1 && !closeEls_1_1.done && (_a = closeEls_1["return"])) _a.call(closeEls_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // esc
        document.addEventListener('keyup', this.__closeEscListener);
    };
    /** Remove DOM Event Listeners */
    Modal.prototype.removeListeners = function () {
        var e_2, _a;
        // attr
        var closeEls = this.config.el.querySelectorAll("[" + this.config.closeAttr + "]");
        try {
            for (var closeEls_2 = Modal_values(closeEls), closeEls_2_1 = closeEls_2.next(); !closeEls_2_1.done; closeEls_2_1 = closeEls_2.next()) {
                var el = closeEls_2_1.value;
                el.removeEventListener('click', this.__closeAttrListener);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (closeEls_2_1 && !closeEls_2_1.done && (_a = closeEls_2["return"])) _a.call(closeEls_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        // esc
        document.removeEventListener('keyup', this.__closeEscListener);
    };
    /** show/hide animation end callback */
    Modal.prototype.animationEndCallback = function (key1, key2, hide, event) {
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
    };
    /** show/hide transition end callback */
    Modal.prototype.transitionEndCallback = function (key1, key2, hide, event) {
        console.log('transitionEndCallback', key1);
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
    Modal.prototype.show = function (config) {
        var _this = this;
        if (this.config.visible) {
            return;
        }
        var el = this.config.el;
        var container = this.config.dom.container;
        var backdrop = this.config.dom.backdrop;
        if (this.pending) {
            if (this.config.animations) {
                container.classList.add(this.config.classes.animation.cancel);
                backdrop === null || backdrop === void 0 ? void 0 : backdrop.classList.add(this.config.classes.animation.cancel);
            }
            else if (this.config.transitions) {
                container.classList.add(this.config.classes.transition.cancel);
                backdrop === null || backdrop === void 0 ? void 0 : backdrop.classList.add(this.config.classes.transition.cancel);
            }
            this.emitter.unsubscribe('containerAnimationEnd', 'backdropAnimationEnd');
        }
        this.emitter.emit('beforeShow', this);
        this.config.visible = true;
        if (document.activeElement && document.hasFocus()) {
            Modal.blurEl = document.activeElement;
            document.activeElement.blur();
        }
        if (this.config.animations) {
            this.pending = true;
            container.classList.remove(this.config.classes.animation.hide.container, this.config.classes.animation.cancel);
            backdrop === null || backdrop === void 0 ? void 0 : backdrop.classList.remove(this.config.classes.animation.hide.backdrop, this.config.classes.animation.cancel);
        }
        else if (this.config.transitions) {
            this.pending = true;
            container.classList.remove(this.config.classes.transition.hide.container, this.config.classes.transition.cancel);
            backdrop === null || backdrop === void 0 ? void 0 : backdrop.classList.remove(this.config.classes.transition.hide.backdrop, this.config.classes.transition.cancel);
        }
        el.classList.add(this.config.classes.visible);
        if (this.config.animations) {
            this.animation.container = true;
            container.classList.add(this.config.classes.animation.show.container);
            if (backdrop) {
                this.animation.backdrop = true;
                backdrop.classList.add(this.config.classes.animation.show.backdrop);
            }
        }
        else if (this.config.transitions) {
            this.animation.container = true;
            container.classList.add(this.config.classes.transition.show.container);
            if (backdrop) {
                this.animation.backdrop = true;
                backdrop.classList.add(this.config.classes.transition.show.backdrop);
            }
        }
        this.addListeners();
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        if (this.config.animations) {
            this.emitter.once('containerAnimationEnd', function (event) { return _this.animationEndCallback('container', 'backdrop', false, event); });
            this.emitter.once('backdropAnimationEnd', function (event) { return _this.animationEndCallback('backdrop', 'container', false, event); });
        }
        else if (this.config.transitions) {
            this.emitter.once('containerTransitionEnd', function (event) { return _this.transitionEndCallback('container', 'backdrop', false, event); });
            this.emitter.once('backdropTransitionEnd', function (event) { return _this.transitionEndCallback('backdrop', 'container', false, event); });
        }
        else {
            this.emitter.emit('afterShow', this);
        }
    };
    Modal.prototype.hide = function (config) {
        var _this = this;
        if (!this.config.visible) {
            return;
        }
        var el = this.config.el;
        var container = this.config.dom.container;
        var backdrop = this.config.dom.backdrop;
        if (this.pending) {
            if (this.config.animations) {
                container.classList.add(this.config.classes.animation.cancel);
                backdrop === null || backdrop === void 0 ? void 0 : backdrop.classList.add(this.config.classes.animation.cancel);
            }
            else if (this.config.transitions) {
                container.classList.add(this.config.classes.transition.cancel);
                backdrop === null || backdrop === void 0 ? void 0 : backdrop.classList.add(this.config.classes.transition.cancel);
            }
            this.emitter.unsubscribe('containerAnimationEnd', 'backdropAnimationEnd');
            this.pending = false;
        }
        this.emitter.emit('beforeHide', this);
        this.removeListeners();
        this.config.visible = false;
        if (this.config.animations) {
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
        else if (this.config.transitions) {
            this.pending = true;
            this.animation.container = true;
            container.classList.remove(this.config.classes.transition.show.container, this.config.classes.transition.cancel);
            if (backdrop) {
                this.animation.backdrop = true;
                backdrop.classList.remove(this.config.classes.transition.show.backdrop, this.config.classes.transition.cancel);
                backdrop.classList.add(this.config.classes.transition.hide.backdrop);
            }
            container.classList.add(this.config.classes.transition.hide.container);
        }
        if (Modal.blurEl) {
            Modal.blurEl.focus();
        }
        Modal.blurEl = null;
        document.body.style.overflow = '';
        document.body.style.height = '';
        if (this.config.animations) {
            this.emitter.once('backdropAnimationEnd', function (event) { return _this.animationEndCallback('backdrop', 'container', true, event); });
            this.emitter.once('containerAnimationEnd', function (event) { return _this.animationEndCallback('container', 'backdrop', true, event); });
        }
        else if (this.config.transitions) {
            this.emitter.once('backdropTransitionEnd', function (event) { return _this.transitionEndCallback('backdrop', 'container', true, event); });
            this.emitter.once('containerTransitionEnd', function (event) { return _this.transitionEndCallback('container', 'backdrop', true, event); });
        }
        else {
            this.emitter.emit('afterHide', this);
            el.classList.remove(this.config.classes.visible);
        }
    };
    Modal.blurEl = null;
    return Modal;
}());
/* harmony default export */ var src_Modal = (Modal);

// CONCATENATED MODULE: ./src/index.ts
;
/* harmony default export */ var src_0 = (src_Modal);


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
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(458);
/******/ })()
;
});
//# sourceMappingURL=Modal.umd.js.map