const show_more_text = () => {
   const SYMBOLS_COUNT = 430;
   const textEl = document.querySelector('.about__text');
   const textChilds = Array.from(document.querySelectorAll('.about__text > p'));
   const textElDefault = textEl.innerHTML;
   const mql = window.matchMedia('screen and (max-width: 992px)');

   const textChanged = textChilds.map(child => `<p>${child.textContent}</p>`).join('');

   function checkTextLength() {
      const slicedText = textChanged.slice(0, SYMBOLS_COUNT) + ' ...';
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
};

export default show_more_text;