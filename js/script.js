'use strict';

var swiper = new Swiper('.swiper-container', {
  speed: 800,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

var body = document.querySelector('body');
var modalOpen = document.querySelector('.contacts__btn');
var modal = document.querySelector('.modal');
var overlay = document.querySelector('.modal-overlay');
var form = modal.querySelector('form');
var fieldName = modal.querySelector('input[name=name]');
var fieldEmail = modal.querySelector('input[name=email]');
var fieldTextarea = modal.querySelector('[name=question]');
var buttonSend = modal.querySelector('.modal__btn');
var modalClose = modal.querySelector('.modal__close');

var isStorageSupport = true;
var storage = {
  name: '',
  email: ''
};

var menuItemContacts = document.querySelector('#contacts');

try {
  storage.name = localStorage.getItem('name');
  storage.email = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
}

/**
 * Функция открытия окна формы обратной связи.
 * @function
 */
function openPopup() {
  body.classList.add('scroll-hidden');
  modal.classList.add('modal-show');
  overlay.classList.add('overlay-show');
  window.addEventListener('keydown', onEscPress);
  setFocus(storage);
};

/**
 * Функция задающая фокус полям формы обратной связи.
 * @function
 * @param {Object} storageObj объект хранилища полей LocalStorage;
 */
function setFocus(storageObj) {
  if (storageObj.name) {
    fieldName.value = storageObj.name;
    fieldEmail.focus();
  } else {
    fieldName.focus();
  }
  if (storageObj.email) {
    fieldEmail.value = storageObj.email;
    fieldTextarea.focus();
  } else {
    fieldEmail.focus();
  }
}

/**
 * Функция закрытия окна формы.
 * @function
 */
function closeModal() {
  form.reset();
  body.classList.remove('scroll-hidden');
  modal.classList.remove('modal-show');
  overlay.classList.remove('overlay-show');
  window.removeEventListener('keydown', onEscPress);
}

/**
 * Функция для закрытия окна формы по нажатии клавиши Esc.
 * @function
 * @param {Object} evt объект события;
 */
function onEscPress(evt) {
  if (evt.keyCode === 27) {
    closeModal();
  }
}

/**
  * Функция для перехода к разделу контактов.
  * @function
  */
function scrollDown() {
  window.location.href = '#contacts';
}

if (modalOpen) {
  modalOpen.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup();
  });
}

if (modalClose) {
  modalClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeModal();
  });
}

if (form) {
  form.addEventListener('submit', function (evt) {
    if (!fieldName.value || !fieldEmail.value) {
      evt.preventDefault();
    } else {
      if (isStorageSupport) {
        localStorage.setItem('name', fieldName.value);
        localStorage.setItem('email', fieldEmail.value);
      }
    }
  });
}

if (overlay) {
  overlay.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (overlay.classList.contains('overlay-show')) {
      closeModal();
    }
  });
}

if (menuItemContacts) {
  menuItemContacts.addEventListener('click', scrollDown);
}
