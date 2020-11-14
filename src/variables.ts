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

export const defaultsNEW = {
  id:       null,
  el:       null,
  visible:  false,
  attr: {
    close:      'data-modal-close',
    target:     'data-modal-target',
    id:         'data-modal-id',
  },
  allow: {
    bodyScroll: false,
    closeEsc:   true,
    closeAttr:  true,
  },
  classes: {
    visible:    'modal--visible',
  },
  container: {
    el:         null,
    wrapper:    null,
    mutation:   'animation',
    timeout:    null,
    animation:  false,
    timeouts: {
      animation: 0,
      transition: 100,
    },
    properties: {
      selector:   '.modal__container',
      classes: {
        animation: {
          cancel:   'modal-animation--cancel',
          show:     'modal-animation-container--show',
          hide:     'modal-animation-container--hide',
        },
        transition: {
          cancel:   'modal-transition--cancel',
          show:     'modal-transition-container--show',
          hide:     'modal-transition-container--hide',
        },
        common: {
          show:     'modal-container--hide',
          hide:     'modal-container--hide',
        }
      }
    }
  },
  backdrop: {
    mutation:   'animation',
    timeouts: {
      animation: 0,
      transition: 50,
    },
    properties: {
      classes: {
        visible:    'modal-backdrop--visible',
        animation: {
          cancel:   'modal-animation--cancel',
          show:     'modal-animation-backdrop--show',
          hide:     'modal-animation-backdrop--hide',
        },
        transition: {
          cancel:   'modal-transition--cancel',
          show:     'modal-transition-backdrop--show',
          hide:     'modal-transition-backdrop--hide',
        },
        common: {
          show:     'modal-backdrop--show',
          hide:     'modal-backdrop--hide',
        }
      }
    }
  },
  user: {}
};