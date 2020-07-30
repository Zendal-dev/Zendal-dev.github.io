import $ from 'jquery';
import 'slick-carousel';

$(function () {

   /* BURDER-MENU */
   const headerNav = $('.header-nav');
   headerNav.hide();

   $('.header-burger').on('click', function () {
      $(this).toggleClass('open');
      headerNav.fadeToggle(250);
   });
   /* /BURDER-MENU */


   /* SLICK SLIDER */
   $('.reviews-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
         {
            breakpoint: 991,
            settings: {
               arrows: false,
               dots: true,
            }
         },
      ]
   });
   /* /SLICK SLIDER */
   
});