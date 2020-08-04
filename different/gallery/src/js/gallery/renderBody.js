const renderBody = (data, selector) => {
   const $gallery = document.querySelector(selector);

   const images = data.results.map(item => `
      <div class="gallery-body__img">
         <img src="${item.urls.regular}"/>
      </div>
   `);

   const $content = $gallery.querySelector('.gallery-body');
   $content ? $content.remove() : null;

   $gallery.insertAdjacentHTML('beforeend', `
      <div class="gallery-body">
         ${images.join('')}
      </div>
   `);
};

export default renderBody;