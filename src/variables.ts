import { T_Mutation } from "./types";

export const defaults = {
  id:           null,
  el:           null,
  dom: {
    backdrop:     null,
    container:    null,
  },
  visible:      false,
  mutations: {
    container:  'animation',
    backdrop:   'animation',
  },
  timeout: {
    container: {
      animation:     0,
      transition:    100,
    },
    backdrop: {
      animation:     0,
      transition:    50,
    }
  },
  attr: {
    close:            'data-modal-close',
    target:           'data-modal-target',
    id:               'data-modal-id',
  },
  allow: {
    bodyScroll:       false,
    closeEsc:         true,
    closeAttr:        true,
  },
  selector: {
    backdrop:         '.modal__backdrop',
    container:        '.modal__container',
    btnClose:         '.modal__btn-close',
  },
  classes: {
    visible:          'modal--visible',
    animation: {
      cancel:           'modal-animation--cancel',
      show: {
        container:        'modal-animation-container--show',
        backdrop:         'modal-animation-backdrop--show',
      },
      hide: {
        container:        'modal-animation-container--hide',
        backdrop:         'modal-animation-backdrop--hide',
      }
    },
    transition: {
      cancel:           'modal-transition--cancel',
      show: {
        container:        'modal-transition-container--show',
        backdrop:         'modal-transition-backdrop--show',
      },
      hide: {
        container:        'modal-transition-container--hide',
        backdrop:         'modal-transition-backdrop--hide',
      }
    },
    common: {
      show: {
        container:        'modal-container--show',
        backdrop:         'modal-backdrop--show',
      },
      hide: {
        container:        'modal-container--hide',
        backdrop:         'modal-backdrop--hide',
      }
    }
  }
};