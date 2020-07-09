let promoSlides = document.querySelectorAll('.promo-slide');
let promoControls = document.querySelectorAll('.promo-slider-controls button');
let promoSlideCurrent = 0;

let servicesSlides = document.querySelectorAll('.services-slide');
let servicesControls = document.querySelectorAll('.services-slider-controls button');
let servicesSlideCurrent = 0;

let isStorageSupport = true;
let storage = '';

let mapLink = document.querySelector('.map-link');
let mapPopup = document.querySelector('.modal-map');
let mapClose = document.querySelector('.modal-map .modal-btn-close');

let feedbackLink = document.querySelector('.feedback-link');
let feedbackPopup = document.querySelector('.modal-feedback');
let feedbackClose = document.querySelector('.modal-feedback .modal-btn-close');
let feedbackForm = document.querySelector('.modal-feedback-form');
let feedbackName = document.querySelector('.modal-feedback-name');
let feedbackEmail = document.querySelector('.modal-feedback-email');
let feedbackMessage = document.querySelector('.modal-feedback-message');

if (promoSlides.length > 0) {
  for (let i = 0; i < promoControls.length; i++) {
    promoControls[i].addEventListener('click', function() {
      promoSlides[promoSlideCurrent].classList.remove('promo-slide-current');
      promoControls[promoSlideCurrent].classList.remove('btn-current');
      promoControls[promoSlideCurrent].disabled = false;
      promoSlideCurrent = i;
      promoSlides[promoSlideCurrent].classList.add('promo-slide-current');
      promoControls[promoSlideCurrent].classList.add('btn-current');
      promoControls[promoSlideCurrent].disabled = true;
    });
  }
}

if (servicesSlides.length > 0) {
  for (let i = 0; i < servicesControls.length; i++) {
    servicesControls[i].addEventListener('click', function() {
      servicesSlides[servicesSlideCurrent].classList.remove('services-slide-current');
      servicesControls[servicesSlideCurrent].disabled = false;
      servicesSlideCurrent = i;
      servicesSlides[servicesSlideCurrent].classList.add('services-slide-current');
      servicesControls[servicesSlideCurrent].disabled = true;
    });
  }
}

if (mapLink) {
  mapLink.addEventListener('click', function(evt) {
    evt.preventDefault();
    mapPopup.classList.add('modal-show');
  });

  mapClose.addEventListener('click', function(evt) {
    evt.preventDefault();
    mapPopup.classList.remove('modal-show');
  });

  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      if (mapPopup.classList.contains('modal-show')) {
        evt.preventDefault;
        mapPopup.classList.remove('modal-show');
      }
    }
  });
}

if (feedbackLink) {
  try {
    storage = localStorage.getItem('name');
  } catch (err) {
    isStorageSupport = false;
  }

  feedbackLink.addEventListener('click', function(evt) {
    evt.preventDefault();
    feedbackPopup.classList.add('modal-show');

    if (storage) {
      feedbackName.value = storage;
      feedbackEmail.value = localStorage.getItem('email');
      feedbackMessage.focus();
    } else {
      feedbackName.focus();
    }
  });

  feedbackClose.addEventListener('click', function(evt) {
    evt.preventDefault();
    feedbackPopup.classList.remove('modal-show');
  });

  feedbackForm.addEventListener('submit', function(evt) {
    if (!feedbackName.value || !feedbackEmail.value || !feedbackMessage.value) {
      evt.preventDefault();
      feedbackPopup.classList.remove('modal-error');
      feedbackPopup.offsetWidth = feedbackPopup.offsetWidth;
      feedbackPopup.classList.add('modal-error');

      if (!feedbackMessage.value) {
        feedbackMessage.classList.add('form-field-error');
        feedbackMessage.focus();
      }

      if (!feedbackEmail.value) {
        feedbackEmail.classList.add('form-field-error');
        feedbackEmail.focus();
      }

      if (!feedbackName.value) {
        feedbackName.classList.add('form-field-error');
        feedbackName.focus();
      }

    } else {
      if (isStorageSupport) {
        localStorage.setItem('name', feedbackName.value);
        localStorage.setItem('email', feedbackEmail.value);
      }
    }

    feedbackMessage.addEventListener('input', function() {
      feedbackMessage.classList.remove('form-field-error');
    });

    feedbackEmail.addEventListener('input', function() {
      feedbackEmail.classList.remove('form-field-error');
    });

    feedbackName.addEventListener('input', function() {
      feedbackName.classList.remove('form-field-error');
    });
  });



  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      if (feedbackPopup.classList.contains('modal-show')) {
        evt.preventDefault;
        feedbackPopup.classList.remove('modal-show');
        feedbackPopup.classList.remove('modal-error');
      }
    }
  });
}
