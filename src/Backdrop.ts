import EventEmitter, { I_EventEmitter } from "@xaro/event-emitter";
import extend from "@xaro/extend";
import { T_Mutation } from "./types";

const defaults = {
  
}

export default class Backdrop {
  emitter: I_EventEmitter;
  config: {
    el:     Element,
    isInit: boolean,
    on:     {

    }
  };
  animation:  boolean       = false;
  timeout:    number | null = null;

  constructor(config) {
    this.config   = extend({}, defaults, config);
    this.emitter  = new EventEmitter(this.config.on);

    this.__mutationEndListener = this.__mutationEndListener.bind(this);
    this.config.el.addEventListener('[MutationType]', this.__mutationEndListener);
  }

  protected __mutationEndListener(event: any): void {
    this.emitter.emit('mutationEnd', this, event);
  }

  protected mutationEndCallback() {
    this.animation  = false;


  }


  addClass(animationType: T_Mutation, classType: any) {
    // adding cancel class to this.config.el
  }
  
  addClass(animationType: T_Mutation, classType: any) {
    // adding cancel class to this.config.el
  }
}