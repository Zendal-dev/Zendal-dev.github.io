// Adding bg-color to the .header after scrolling .intro
const $header = document.querySelector('.header')
const INTRO_HEIGHT = 800

document.addEventListener('scroll', () => {
   if (window.scrollY >= (INTRO_HEIGHT || window.innerHeight)) {
      $header.classList.add('bg-active')
   } else {
      $header.classList.remove('bg-active')
   }
})


// Burger btn
const $burgerBtn = document.querySelector('.burger-btn')
const $headerNav = document.querySelector('.header__nav')

$burgerBtn.addEventListener('click', () => {
   $burgerBtn.classList.toggle('active')
   $headerNav.classList.toggle('active')
})


// Aos.js
AOS.init({
   delay: 100
})


// Swiper.js
const swiper = new Swiper('.swiper-container', {
   loop: false,
   pagination: {
      el: '.swiper-pagination'
   },
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
   }
})

