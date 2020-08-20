import { renderBody } from "./render";

const updateImages = async (tag, selector, apiKey) => {
   const url = `https://api.unsplash.com/search/photos?page=1&order_by=latest&query=${tag}&client_id=${apiKey}`,
      response = await fetch(url),
      images = await response.json();

   renderBody(images, selector);
};

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
         await updateImages(tag, selector, apiKey);
      }
   });

   $tabs[0].click();
};

export default tabs;