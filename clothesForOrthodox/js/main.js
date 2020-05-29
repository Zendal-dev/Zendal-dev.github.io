'use strict';

/* Product counter */
(function () {
   const productCounter = document.querySelector('.product-counter');
   const productAmountEl = document.querySelector('.product-counter__amount');

   productCounter.addEventListener('click', (e) => {
      const target = e.target;

      if (target.dataset.add) {
         productAmountEl.textContent++;
      } else if (target.dataset.remove && productAmountEl.textContent > 1) {
         productAmountEl.textContent--;
      }
   });
}());
/* /Product counter */

/* Show more */
(function showMore() {
   const SYMBOLS_COUNT = 430;
   const textEl = document.querySelector('.about__text');
   const textChilds = Array.from(document.querySelectorAll('.about__text > p'));
   const textElDefault = textEl.innerHTML;
   const mql = window.matchMedia('screen and (max-width: 992px)');

   const textChaged = textChilds.map(child => `<p>${child.textContent}</p>`).join('');

   function checkTextLength() {
      const slicedText = textChaged.slice(0, SYMBOLS_COUNT) + ' ...';
      const $showMore = document.createElement('span');
      const $showLess = document.createElement('span');

      $showMore.classList.add('show-more');
      $showMore.textContent = 'Читать далее';
      $showLess.classList.add('show-less');
      $showLess.textContent = 'Показать меньше';

      $showMore.addEventListener('click', () => {
         textEl.innerHTML = textElDefault;
         textEl.appendChild($showLess);
      });

      $showLess.addEventListener('click', () => {
         textEl.innerHTML = slicedText;
         textEl.appendChild($showMore);
      });

      if (mql.matches && textEl.textContent.length > SYMBOLS_COUNT) {
         textEl.innerHTML = slicedText;
         textEl.appendChild($showMore);
      } else {
         textEl.innerHTML = textElDefault;
      }
   }

   checkTextLength();
}());
/* /Show more */

/* Burger menu */
(function burger () {
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
}());
/* /Burger menu */

/* Product Tabs */
(function productTabs() {
   const tabsLinks = document.querySelectorAll('.product-tabs__link');
   const tabsItems = document.querySelectorAll('.product-tabs__item');

   tabsLinks.forEach(item => {
      item.classList.remove('focus');
      item.addEventListener('click', function (e) {
         onTabsLinkClick(e);
      });
   });

   tabsLinks[0].classList.add('focus');
   tabsItems[0].classList.add('open');

   function onTabsLinkClick(e) {
      e.preventDefault();
      const target = e.target;
      const linkHref = target.getAttribute('href');

      for (let i = 0; i < tabsLinks.length; i++) {
         tabsLinks[i].classList.remove('focus');
         tabsItems[i].classList.remove('open');
      }

      target.classList.add('focus');

      const tabsItem = document.querySelector(linkHref);
      tabsItem.classList.add('open');
   }
}());
/* /Product Tabs */
