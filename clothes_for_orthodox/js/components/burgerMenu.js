const burgerMenu = () => {
   const burgerEl = document.querySelector('#burger');
   const burgerElParent = burgerEl.parentElement;
   const burgerItemEl = document.querySelector('.burger__item');
   const navEl = document.querySelector('.header__nav');

   burgerEl.addEventListener('click', function() {
      burgerItemEl.classList.toggle('active');
      navEl.classList.toggle('active');
      burgerElParent.classList.toggle('fixed-top');
      burgerElParent.classList.toggle('col-2');
      burgerElParent.classList.toggle('col-12');
   });
};

export default burgerMenu;