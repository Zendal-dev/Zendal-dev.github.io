'use strict';

class Game {
   constructor() {
      this.countdownField = document.querySelector('.time-left');
      this.expressionField = document.querySelector('.expression');
      this.userSolutionField = document.querySelector('.user-response');
      this.calcBody = document.querySelector('.calc-body');

      this.started = false;
      this.solved = false;

      this.TIMEOUT = 1000 * 20;
      this.maxInt = 0;
      this.correctAnswersCount = 0;
      this.incorrectAnswersCount = 0;
      this.intervalID = null;
      this.trueAnswer = null;
      this.userAnswer = null;
      this.operation = '+';

      this.methods = {
         '+': ({a, b} = {}) => a + b,
         '-': ({a, b} = {}) => a - b,
         '*': ({a, b} = {}) => a * b,
         '/': ({a, b} = {}) => a / b
      };

      this.calcBodyHandlerWrap = (e) => this.calcBodyHandler(e);
      this.init();
   }

   init() {
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
      if (this.started) return;

      const maxCountField = document.querySelector('#max-value');
      const startTime = Date.now();

      this.started = true;
      this.maxInt = +maxCountField.value;

      // Обратный отсчет
      this.intervalID = setInterval(() => {
         const time = this.TIMEOUT - (Date.now() - startTime);
         this.countdownField.textContent = time;
         if (time <= 0) {
            clearInterval(this.intervalID);
            this.showResultWindow();
            this.countdownField.textContent = '0';
         }
      }, 0);

      // Генерация и вывод рандомного выражения
      this.generateNewGameIteration();

      // Клик на любую кнопку
      this.calcBody.addEventListener('click', this.calcBodyHandlerWrap);
   }

   generateNewGameIteration() {
      const randomInts = { // TODO: Деструктуризация сделана криво. Придумать лучшее решение
         a: this.getRandomInt(this.maxInt),
         b: this.getRandomInt(this.maxInt)
      };

      // Вывод сгенерированного выражения
      this.expressionField.textContent = `${randomInts.a} ${this.operation} ${randomInts.b}`;

      // Запись правильного ответа
      this.trueAnswer = this.methods[this.operation](randomInts);
   }

   calcBodyHandler(event) {
      const target = event.target;
      const MAX_ANSWER_LENGTH = 6;
      const btnData = target.dataset.btn;

      if (!this.started) return;

      switch (true) {
         case btnData === 'solution' :
            this.userSolutionField.textContent = this.trueAnswer;
            this.solved = true;
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
            if (this.solved) { // может быть защитывать в неправильные ответы
               this.userSolutionField.textContent = '';
               this.generateNewGameIteration();
               this.solved = false;
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
      this.started = false;
      this.userSolutionField.textContent = '';
      this.expressionField.textContent = '';
      clearInterval(this.intervalID);
      this.countdownField.textContent = '0';
      this.calcBody.removeEventListener('click', this.calcBodyHandlerWrap);
   }
}

const game = new Game();





