const tabs = (triggerSelector, itemSelector) => {
   const tabsLinks = document.querySelectorAll(triggerSelector);
   const tabsItems = document.querySelectorAll(itemSelector);

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
};

export default tabs;