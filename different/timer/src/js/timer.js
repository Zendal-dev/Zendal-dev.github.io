class Timer {
   constructor(selector) {
      this._timerSelector = selector;
      this._timerSelects = document.querySelectorAll('.timer-setting__select');
      this._diss = 0;
      this._totalTime = 0;
      this._timeHasPassed = 0;
      this._started = false;
      this._interval = null;
      this._timeout = null;

      this.init();
   }

   clearPlanning() {
      clearInterval(this._interval);
      clearTimeout(this._timeout);
   }

   addZero(num) {
      return String(num).padStart(2, '0');
   }

   init() {
      const resetBtn = document.querySelector('#reset'),
            pauseBtn = document.querySelector('#pause'),
            startBtn = document.querySelector('#start');

      startBtn.addEventListener('click', () => this.start());
      pauseBtn.addEventListener('click', () => this.pause());
      resetBtn.addEventListener('click', () => this.reset());
   }

   getTimeRemaining(timestamp) {
      const currentTime = Date.parse(new Date().toString());

      this._diss = (timestamp - this._timeHasPassed) - currentTime;

      const seconds = Math.floor((this._diss / 1000) % 60),
            minutes = Math.floor((this._diss / 1000 / 60) % 60),
            hours = Math.floor((this._diss / 1000/ 60 / 60) % 60);

      return {
         'total': this._diss,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      }
   }

   getTimeTemplate(selector = this._timerSelector) {
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

   setClock(timestamp, isReset = false, selector = this._timerSelector) {
      const timer = document.querySelector(selector),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            time = this.getTimeRemaining(timestamp);

      hours.textContent = !isReset ? this.addZero(time.hours) : '00';
      minutes.textContent = !isReset ? this.addZero(time.minutes) : '00';
      seconds.textContent = !isReset ? this.addZero(time.seconds) : '00';
   }

   start() {
      const timestamp = this.getTimeTemplate();
      this._totalTime = this.getTimeRemaining(timestamp).total;

      if (this._totalTime > 0) {
         this._timerSelects.forEach(select => select.disabled = true);

         this._interval = setInterval(() => {
            this.setClock(timestamp);
         }, 1000);

         this._timeout = setTimeout(this.clearPlanning, this._totalTime);
      }

      this._started = true;
   }

   pause() {
      if (!this._started) return;
      
      this.clearPlanning();
      this._timeHasPassed = this._totalTime - this._diss;
      this._started = false;
   }

   reset() {
      if (!this._started) return;

      this.clearPlanning();
      this.setClock(0, true);
      this._timerSelects.forEach(select => {
         select.disabled = false;
         select[0].selected = true;
      });
      this._started = false;
   }
}

export default Timer;