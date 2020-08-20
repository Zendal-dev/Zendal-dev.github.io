const renderHeader = (selector) => {
   document.querySelector(selector).innerHTML = `
      <div class="gallery-header">
         <div class="gallery-header__tab" data-tag="travel">Travel</div>
         <div class="gallery-header__tab" data-tag="world">World</div>
         <div class="gallery-header__tab" data-tag="mind">Mind</div>
         <div class="gallery-header__tab" data-tag="space">Space</div>
      </div>   
   `
};

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

export { renderHeader, renderBody };