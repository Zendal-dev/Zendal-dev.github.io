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

export default renderHeader;