class Timer {
   constructor(selector) {
      this.timerSelector = selector;
      this.timerSelects = document.querySelectorAll('.timer-setting__select');
      this.diss = 0;
      this.totalTime = 0;
      this.timeHasPassed = 0;
      this.started = false;
      this.interval = null;
      this.timeout = null;

      this.#setup();
   }

   clearPlanning() {
      clearInterval(this.interval);
      clearTimeout(this.timeout);
   }

   #addZero(num) {
      return String(num).padStart(2, '0');
   }

   #setup() {
      const resetBtn = document.querySelector('#reset'),
            pauseBtn = document.querySelector('#pause'),
            startBtn = document.querySelector('#start');

      startBtn.addEventListener('click', () => this.start());
      pauseBtn.addEventListener('click', () => this.pause());
      resetBtn.addEventListener('click', () => this.reset());
   }

   #getTimeRemaining(timestamp) {
      const currentTime = Date.parse(new Date().toString());

      this.diss = (timestamp - this.timeHasPassed) - currentTime;

      const seconds = Math.floor((this.diss / 1000) % 60),
            minutes = Math.floor((this.diss / 1000 / 60) % 60),
            hours = Math.floor((this.diss / 1000/ 60 / 60) % 60);

      return {
         'total': this.diss,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      }
   }

   #getTimeTemplate(selector = this.timerSelector) {
      const date = new Date(),
            timer = document.querySelector(selector),
            hours = timer.querySelector('#set-hours'),
            minutes = timer.querySelector('#set-minutes'),
            seconds = timer.querySelector('#set-seconds');

      date.setHours(date.getHours() + +hours.value);
      date.setMinutes(date.getMinutes() + +minutes.value);
      date.setSeconds(date.getSeconds() + +seconds.value);

      return Date.parse(date.toString());
   }

   #setClock(timestamp, isReset = false, selector = this.timerSelector) {
      const timer = document.querySelector(selector),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            time = this.#getTimeRemaining(timestamp);

      hours.textContent = !isReset ? this.#addZero(time.hours) : '00';
      minutes.textContent = !isReset ? this.#addZero(time.minutes) : '00';
      seconds.textContent = !isReset ? this.#addZero(time.seconds) : '00';
   }

   start() {
      const timestamp = this.#getTimeTemplate();
      this.totalTime = this.#getTimeRemaining(timestamp).total;

      if (this.totalTime > 0) {
         this.timerSelects.forEach(select => select.disabled = true);

         this.interval = setInterval(() => {
            this.#setClock(timestamp);
         }, 1000);

         this.timeout = setTimeout(this.clearPlanning, this.totalTime);
      }

      this.started = true;
   }

   pause() {
      if (!this.started) return;
      
      this.clearPlanning();
      this.timeHasPassed = this.totalTime - this.diss;
      this.started = false;
   }

   reset() {
      if (!this.started) return;

      this.clearPlanning();
      this.#setClock(0, true);
      this.timerSelects.forEach(select => {
         select.disabled = false;
         select[0].selected = true;
      });
      this.started = false;
   }
}

export default Timer;