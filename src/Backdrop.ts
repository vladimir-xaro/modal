import CSSClassAnimations, { I_CSSClassAnimations } from "@xaro/css-class-animations";
import EventEmitter, { I_EventEmitter } from "@xaro/event-emitter";
import extend from "@xaro/extend";
import { I_Backdrop, I_BackdropConfig, T_Mutation } from "./types";

const defaults = {
  el:         null,
  visible:    false,
  mutation:   'animation',
  animation:  null,
  timeout:    null,
}

export default class Backdrop implements I_Backdrop {
  static instances: I_Backdrop[]      = [];
  static current:   I_Backdrop | null = null;
  index: number;

  emitter:    I_EventEmitter;

  config: I_BackdropConfig;

  animation:  I_CSSClassAnimations;

  constructor(config: any = {}) {
    Backdrop.instances.push(this);
    this.index = Backdrop.instances.length - 1;

    this.config   = extend({}, defaults, config);

    if (! this.config.el) {
      const el = document.createElement('div');
      el.classList.add('modal-backdrop');
      document.body.append(el);
      this.config.el = el;
    }

    this.emitter = new EventEmitter();

    this.animation = new CSSClassAnimations({
      el:   this.config.el,
      allow: [
        'animationend',
        'transitionend'
      ],
      on: {
        end: (event: AnimationEvent | TransitionEvent) => {
          this.emitter.emit('mutationEnd', this, event);
        }
      }
    });

    // TODO: CSSClassAnimations refactoring
    // this.__mutationEndListener = this.__mutationEndListener.bind(this);
    // this.config.el.addEventListener('animationend', this.__mutationEndListener as EventListener);
    // this.config.el.addEventListener('transitionend', this.__mutationEndListener as EventListener);
  }

  // TODO: CSSClassAnimations refactoring
  // protected __mutationEndListener(event: TransitionEvent | AnimationEvent): void {
  //   // this.config.animation = false;
  //   this.emitter.emit('mutationEnd', this, event);
  // }


  unsubscribeMutation() {
    this.emitter.unsubscribe('mutationEnd');
  }
}