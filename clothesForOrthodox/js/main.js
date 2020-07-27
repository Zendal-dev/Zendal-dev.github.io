import counter from "./components/counter.js";
import showMoreText from "./components/showMoreText.js";
import burgerMenu from "./components/burgerMenu.js";
import tabs from "./components/tabs.js";

window.addEventListener('DOMContentLoaded', () => {
   counter();
   showMoreText();
   burgerMenu();
   tabs('.product-tabs__link', '.product-tabs__item');
});