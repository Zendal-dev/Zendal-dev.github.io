class Game {
   constructor() {
      this.countdownField = document.querySelector('.time-left');
      this.expressionField = document.querySelector('.expression');
      this.userSolutionField = document.querySelector('.user-response');
      this.calcBody = document.querySelector('.calc-body');

      this.isStarted = false;
      this.isSolved = false;

      this.TIMEOUT = 1000 * 20;
      this.maxInt = 0;
      this.correctAnswersCount = 0;
      this.incorrectAnswersCount = 0;
      this.intervalID = null;
      this.trueAnswer = null;
      this.userAnswer = null;
      this.operation = '+';

      this.calcBodyHandlerWrap = e => this.calcBodyHandler(e);
      this.setup();
   }

   setup() {
      const operatorSelect = document.querySelector('#operation');
      operatorSelect.onchange = function(e) {
         this.operation = e.target.options[e.target.selectedIndex].dataset.operation;
      };

      const startBtn = document.querySelector('.btn-start');
      startBtn.addEventListener('click', () => this.startBtnHandler());

      const resetBtn = document.querySelector('.btn-reset');
      resetBtn.addEventListener('click', () => this.resetBtnHandler());
   }

   getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
   }

   showResultWindow() {
      const correctCount = document.querySelector('.correct-count'),
            wrongCount = document.querySelector('.wrong-count');

      correctCount.textContent = this.correctAnswersCount;
      wrongCount.textContent = this.incorrectAnswersCount;
   }

   startBtnHandler() {
      if (this.isStarted) return;

      const maxCountField = document.querySelector('#max-value'),
            startTime = Date.now();

      this.isStarted = true;
      this.maxInt = +maxCountField.value;

      // Countdown
      this.intervalID = setInterval(() => {
         const time = this.TIMEOUT - (Date.now() - startTime);
         this.countdownField.textContent = time;
         if (time <= 0) {
            clearInterval(this.intervalID);
            this.showResultWindow();
            this.countdownField.textContent = '0';
         }
      }, 0);

      // Generation and output random expressions
      this.generateNewGameIteration();

      // Pressing any button
      this.calcBody.addEventListener('click', this.calcBodyHandlerWrap);
   }

   generateNewGameIteration() {
      const methods = {
         '+': ({a, b} = {}) => a + b,
         '-': ({a, b} = {}) => a - b,
         '*': ({a, b} = {}) => a * b,
         '/': ({a, b} = {}) => a / b
      };

      const randomInts = { // TODO: Деструктуризация сделана криво. Придумать лучшее решение
         a: this.getRandomInt(this.maxInt),
         b: this.getRandomInt(this.maxInt)
      };

      // Outputting the generated expression
      this.expressionField.textContent = `${randomInts.a} ${this.operation} ${randomInts.b}`;

      // Recording the correct answer
      this.trueAnswer = methods[this.operation](randomInts);
   }

   calcBodyHandler(event) {
      const target = event.target;
      const MAX_ANSWER_LENGTH = 6;
      const btnData = target.dataset.btn;

      if (!this.isStarted) return;

      switch (true) {
         case btnData === 'solution' :
            this.userSolutionField.textContent = this.trueAnswer;
            this.isSolved = true;
            break;

         case (btnData === 'del') && (this.userSolutionField.textContent.length > 0) :
            this.userSolutionField.textContent = this.userSolutionField.textContent.slice(0, -1);
            break;

         case (btnData === 'num') && (this.userSolutionField.textContent.length < MAX_ANSWER_LENGTH) :
            this.userSolutionField.textContent += target.textContent;
            break;

         case (btnData === 'next') || (target.parentElement.dataset.btn === 'next') :
            this.generateNewGameIteration();
            break;

         case btnData === 'ok' :
            if (this.isSolved) {
               this.userSolutionField.textContent = '';
               this.generateNewGameIteration();
               this.isSolved = false;
               break;
            }
            this.userAnswer = +this.userSolutionField.textContent;
            this.okBtnHandler();
            break;
      }
   }

   okBtnHandler() {
      if (this.trueAnswer === this.userAnswer) {
         this.correctAnswersCount++;
         this.userSolutionField.textContent = '';
         this.generateNewGameIteration();
      } else {
         this.incorrectAnswersCount++;
      }
   }

   resetBtnHandler() {
      this.isStarted = false;
      this.userSolutionField.textContent = '';
      this.expressionField.textContent = '';
      clearInterval(this.intervalID);
      this.countdownField.textContent = '0';
      this.calcBody.removeEventListener('click', this.calcBodyHandlerWrap);
   }
}

export default Game;