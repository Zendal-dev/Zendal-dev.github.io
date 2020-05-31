$(function () {

   const headerNav = $('.header-nav');
   headerNav.hide();

   $('.header-burger').on('click', function () {
      $(this).toggleClass('open');
      headerNav.fadeToggle(250);
   });

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