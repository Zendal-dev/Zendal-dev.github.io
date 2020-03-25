$(function() {

   $('.order-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
   });

   $('.order-size__slider').slick({
      arrows: false,
      slidesToShow: 4,
      responsive: [
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
               infinite: false,
               dots: true,
            }
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               infinite: false,
               dots: true,
            }
         }
      ]
   });

   $('.order-decor__slider').slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 1,
               arrows: false,
               dots: true,
            }
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               arrows: false,
               dots: true,
            }
         },
      ]
   });

   $('.reviews-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
         {
            breakpoint: 768,
            settings: {
               arrows: false,
               dots: true,
            }
         },
      ]
   });

   /* slider counter */
   $(".order-decor__slider").on('afterChange', function(event, slick, currentSlide){
      $(".order-slider__counter-current-slide").text(currentSlide + 1);
   });
   /*  /slider counter */
});

function sliderCounter(sliderBlockId) {
   let sliderBlock = document.querySelector(sliderBlockId);
   let sliderBlockliderSize = sliderBlock.querySelector('.order-slider__counter-size');
   let sliderBlockItems = sliderBlock.querySelectorAll('.order-decor__slider-item');
   
   sliderBlockliderSize.innerHTML = sliderBlockItems.length;
}

sliderCounter('.order-decor');


