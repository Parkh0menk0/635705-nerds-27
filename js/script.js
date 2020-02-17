"use strict";

var swiper = new Swiper('.swiper-container', {
  speed: 800,
  effect: 'fade',
  autoplay: {
    delay: 3500,
    disableOnInteraction: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
