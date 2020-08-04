import renderBody from "./renderBody";
import updateImages from "./updateImage";

const tabs = (apiKey, selector) => {
   const $gallery = document.querySelector(selector),
         $header = $gallery.querySelector('.gallery-header'),
         $tabs = $gallery.querySelectorAll('.gallery-header__tab');

   $header.addEventListener('click', async (e) => {
      const target = e.target;

      if (target.classList.contains('gallery-header__tab')) {
         $tabs.forEach(item => item.classList.remove('active'));
         target.classList.add('active');

         const tag = target.dataset.tag;
         updateImages(tag, selector, apiKey);
      }
   });

   $tabs[0].click();
};

export default tabs;