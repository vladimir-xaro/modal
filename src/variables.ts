export const defaults = {
  id:       null,
  el:       null,
  visible:  false,
  attr: {
    close:      'data-modal-close',
    target:     'data-modal-target',
    id:         'data-modal-id',
  },
  allow: {
    bodyScroll:   false,
    closeEsc:     true,
    closeAttr:    true,
    closeOutside: true,
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