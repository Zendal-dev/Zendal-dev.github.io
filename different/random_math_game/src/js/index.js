import customSelect from 'custom-select';
import Game from "./modules/game";

window.addEventListener('DOMContentLoaded', () => {
   'use strict';
   const game = new Game();
   customSelect(document.querySelectorAll('.setting-panel__select'));
});





