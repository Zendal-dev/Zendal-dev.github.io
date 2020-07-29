import 'bootstrap/dist/js/bootstrap';
import counter from "./modules/counter";
import show_more_text from "./modules/show_more_text";
import burger_menu from "./modules/burger_menu";
import tabs from "./modules/tabs";

window.addEventListener('DOMContentLoaded', () => {
   'use strict';

   counter();
   show_more_text();
   burger_menu();
   tabs('.product-tabs__link', '.product-tabs__item');
});