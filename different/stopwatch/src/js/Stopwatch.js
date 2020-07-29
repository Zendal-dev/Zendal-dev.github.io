class Stopwatch {
   constructor() {
      this.display = document.querySelector('#display');
      this.roundDisplay = document.querySelector('#round-display');
      this.roundDisplayHeader = document.querySelector('.stopwatch-round-display__header');
      this.resetBtn = document.querySelector('#reset');
      this.roundBtn = document.querySelector('#round');
      this.pauseBtn = document.querySelector('#pause');
      this.startBtn = document.querySelector('#start');

      this.started = false;
      this.timeHasPassed = null;
      this.interval = null;
      this.formatted = null;

      this.timestamp = 0;
      this.ms = 0;
      this.s = 0;
      this.m = 0;
      this.h = 0;
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

            this.timestamp = ((currentTime + this.timeHasPassed) - startTime);

            this.ms = Math.floor((this.timestamp % 1000) / 10);
            this.s = Math.floor(this.timestamp / 1000) % 60;
            this.m = Math.floor(this.s / 60) % 60;
            this.h = Math.floor(this.m / 60) % 60;

            this.formatted = [
               this.h.toString().padStart(2, '0'),
               this.m.toString().padStart(2, '0'),
               this.s.toString().padStart(2, '0'),
               this.ms.toString().padStart(2, '0')
            ].join(':');

            this.display.textContent = this.formatted;
         });
      }

      this.started = true;
   } // /start()

   pause() {
      clearInterval(this.interval);
      this.timeHasPassed = this.timestamp;
      this.started = false;
   }

   reset() {
      clearInterval(this.interval);
      this.roundDisplayHeader.classList.remove('show');
      this.roundDisplay.innerHTML = '';
      this.roundCount = 0;
      this.display.textContent = '00:00:00:00';
      this.timeHasPassed = 0;
      this.started = false;
   }

   round() {
      if (!this.started) return false;

      this.roundCount++;
      this.roundDisplayHeader.classList.add('show');

      this.roundDisplay.insertAdjacentHTML('afterbegin', `
        <div class="round-display__row">
           <span>${this.roundCount}</span>
           <span>${this.formatted}</span>
        </div>
      `);
   }
}

export default Stopwatch;