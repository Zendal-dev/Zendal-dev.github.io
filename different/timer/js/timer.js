class Timer {
   constructor() {
      this.display = document.querySelector('#display');
      this.resetBtn = document.querySelector('#reset');
      this.pauseBtn = document.querySelector('#pause');
      this.startBtn = document.querySelector('#start');
      
      this.timerSelects = document.querySelectorAll('.timer-setting__select');
      this.hoursSelect = document.querySelector('#edt-hour');
      this.minutesSelect = document.querySelector('#edt-min');
      this.secondSelect = document.querySelector('#edt-sec');

      this.started = false;
      this.timeHasPassed = null;
      this.interval = null;
      this.timeout = null;
      
      this.delta = 0;
      this.totalTime = 0;
      this.s = 0;
      this.m = 0;
      this.h = 0;

      this.startBtn.addEventListener('click', () => this.start());
      this.pauseBtn.addEventListener('click', () => this.pause());
      this.resetBtn.addEventListener('click', () => this.reset());
   }

   getConvertedToMillisecond(hours, minutes, seconds) {
      const hoursInMs = +hours * 60 * 60 * 1000, 
            minutesInMs = +minutes * 60 * 1000, 
            secondsInMs = +seconds * 1000;

      return hoursInMs + minutesInMs + secondsInMs;
   }   

   formattingTime(startTime) {
      this.delta = ((Date.now() + this.timeHasPassed) - startTime);
      
      this.s = Math.floor( ((this.totalTime - this.delta) / 1000) % 60);
      this.m = Math.floor( ((this.totalTime - this.delta) / (1000 * 60)) % 60);
      this.h = Math.floor( ((this.totalTime - this.delta) / (1000 * 60 * 60)) % 24);

      const formattedTime = [
         this.h.toString().padStart(2, '0'),
         this.m.toString().padStart(2, '0'),
         this.s.toString().padStart(2, '0'),
      ].join(':');

      return formattedTime;
   }

   clearPlanning() {
      clearInterval(this.interval);
      clearTimeout(this.timeout);
   }

   start() {
      const startTime = Date.now();

      this.totalTime = this.getConvertedToMillisecond(
         this.hoursSelect.value,
         this.minutesSelect.value, 
         this.secondSelect.value
      );      

      if (!this.started && this.totalTime > 0) {
         this.timerSelects.forEach(select => select.disabled = true);
         
         this.interval = setInterval(() => {
            this.display.textContent = this.formattingTime(startTime);
         });

         this.timeout = setTimeout(() => {
            this.clearPlanning();
         }, this.totalTime);
      }

      this.started = true;
   }

   pause() {
      if (this.started === false) return;
      
      this.clearPlanning();
      this.timeHasPassed = this.delta;
      this.started = false;
   }

   reset() {
      if (this.started === false) return;

      this.clearPlanning();
      this.timerSelects.forEach(select => select.disabled = false);
      this.display.textContent = '00:00:00';
      this.started = false;
   }

}

export default Timer;