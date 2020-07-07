'use strict';

const generateId = () => {
   return Math.round((Math.random() * 1e8)).toString(16);
};

const
   taskItems = document.querySelector('.task-items'),
   taskEditorArea = document.querySelector('.task-editor__area'),
   taskEditor = document.querySelector('.task-editor'),
   addTaskBtn = document.querySelector('.task-editor__add-btn'),
   cancelTaskBtn = document.querySelector('.task-editor__cancel-btn');

addTaskBtn.classList.add('task-editor__add-btn--disabled');

let dbTasks = JSON.parse(localStorage.getItem('tasks')) || [];

const renderTaskItem = task => {
   const taskItem = document.createElement('li');
   taskItem.classList.add('task-items__item');

   taskItem.innerHTML = `
      <button class="task-complete-btn" data-id="${task.id}">
         <img src="images/check.svg" alt="">
      </button>
      <p class="task-items__item-text">${task.description}</p>
      <button class="task-trash" data-id="${task.id}">
         <img src="images/trash.svg" alt="">
      </button>
   `;

   taskItems.append(taskItem);
};

const addTask = event => {
   event.preventDefault();
   const taskAreaValue = taskEditorArea.value;

   if (taskAreaValue) {
      const task = {
         id: generateId(),
         description: taskAreaValue
      }

      dbTasks.push(task);
      init();

      taskEditorArea.value = '';
      addTaskBtn.classList.add('task-editor__add-btn--disabled');
   }
};

const deleteTask = task => {
   const targetId = task.dataset.id;
   dbTasks = dbTasks.filter(task => task.id !== targetId);
   init();
};

const init = () => {
  taskItems.textContent = '';
  dbTasks.forEach(renderTaskItem);

  localStorage.setItem('tasks', JSON.stringify(dbTasks));
};

taskEditor.addEventListener('submit', addTask);

cancelTaskBtn.addEventListener('click', () => {
   taskEditorArea.value = '';
});

taskEditorArea.addEventListener('input', function (event) {
   if (this.value) {
      addTaskBtn.classList.remove('task-editor__add-btn--disabled');
   } else addTaskBtn.classList.add('task-editor__add-btn--disabled');

   // auto resize area
   this.style.height = 'auto';
   this.style.height = '' + this.scrollHeight + 'px';
});


taskItems.addEventListener('click', (event) => {
   const target = event.target;

   if (target.closest('.task-complete-btn')) {
      const task = target.closest('.task-complete-btn');
      task.classList.add('active');

      const promise = new Promise((resolve) => { // можно делитнуть промис
         setTimeout(() => {
            task.classList.remove('active');
            resolve();
         }, 300);
      });

      promise.then(() => deleteTask(task));

   } else if (target.closest('.task-trash')) {
      const task = target.closest('.task-trash');
      deleteTask(task);
   }
});

init();