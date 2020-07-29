import $ from 'jquery';
import 'slick-carousel';

$(function(){

   $('.categories-slider').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: 'linear',
      responsive: [
         {
            breakpoint: 1180,
            settings: {
               slidesToShow: 3,
               arrows: false,
               dots: true,
            }
         },{
            breakpoint: 816,
            settings: {
               slidesToShow: 2,
            }
         },{
            breakpoint: 576,
            settings: {
               slidesToShow: 1,
            }
         }
      ]
   });

});
