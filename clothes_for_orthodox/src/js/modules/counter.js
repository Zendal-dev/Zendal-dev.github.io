const counter = () => {
   const counter = document.querySelector('.product-counter');
   const amountEl = document.querySelector('.product-counter__amount');

   counter.addEventListener('click', (e) => {
      const target = e.target;

      if (target.dataset.add) {
         amountEl.textContent++;
      } else if (target.dataset.remove && amountEl.textContent > 1) {
         amountEl.textContent--;
      }
   });
};

export default counter;