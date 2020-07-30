import $ from 'jquery';

$(function () {

   /* BURGER-MENU */
   const $headerNav = $('.header-nav');
   $headerNav.hide();

   $('.header-burger').on('click', function () {
      $(this).toggleClass('active');
      $headerNav.fadeToggle(200);
   });

   /* SEARCH */
   const $field = $('.header-search__field');

   $('.header-search__field').hide();

   $('.header-search').on('click', function () {
      const $this = $(this);

      if (!$this.is('.active')) {
         $field.fadeIn(100).animate({
            opacity: 1,
            left: '-190'
         });
         setTimeout(() => $this.addClass('active'), 400)
      } else {
         $field.animate({
            opacity: '0',
            left: '0'
         }, 500).fadeOut();
         setTimeout(() => $this.removeClass('active'), 100);
      }

   });

});