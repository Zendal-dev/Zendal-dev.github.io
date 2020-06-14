'use strict';

class Stopwatch {
   constructor() {
      this.display = document.querySelector('#display');
      this.roundDisplay = document.querySelector('#round-display');
      this.resetBtn = document.querySelector('#reset');
      this.roundBtn = document.querySelector('#round');
      this.pauseBtn = document.querySelector('#pause');
      this.startBtn = document.querySelector('#start');

      this.roundDisplayHeader = document.querySelector('.stopwatch-round-display__header');

      this.started = false;
      this.timeHasPassed = null;
      this.interval = null;
      this.delta = null;

      // this.roundDelta = null;
      this.roundCount = 0;

      this.startBtn.addEventListener('click', () => this.start());
      this.pauseBtn.addEventListener('click', () => this.pause());
      this.resetBtn.addEventListener('click', () => this.reset());
      this.roundBtn.addEventListener('click', () => this.round());
   }

   start() {
      const startTime = Date.now();

      if (!this.started) {
         this.interval = setInterval(() => {
            const currentTime = Date.now();
            this.delta = (currentTime + this.timeHasPassed) - startTime;

            this.display.textContent = this.delta;
         });
      }

      this.started = true;
   } // /start()

   pause() {
      clearInterval(this.interval);
      this.timeHasPassed = this.delta;
      this.started = false;
   }

   reset() {
      clearInterval(this.interval);
      this.roundDisplayHeader.classList.remove('show');
      this.roundDisplay.innerHTML = '';
      this.display.textContent = 0;
      this.timeHasPassed = 0;
      this.started = false;
   }

   round() {
      // this.roundDelta = this.delta;
      this.roundCount++;

      this.roundDisplayHeader.classList.add('show');

      const round = document.createElement('div');
      round.classList.add('round-display__row');
      round.insertAdjacentHTML('beforeend', `
        <span>${this.roundCount}</span>
        <span>${this.delta}</span>
      `);
      this.roundDisplay.append(round);
   }
} // /Stopwatch

const timer = new Stopwatch();


