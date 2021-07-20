import './style.css';

const todoList = document.getElementById('todo-list');
const list = [
    {
        description: 'Wake up',
        completed: false,
        index: 0
    },
    {
        description: 'Write some code',
        completed: false,
        index: 0
    },
    {
        description: 'Request Code Review',
        completed: false,
        index: 0
    },
    {
        description: 'Get some rest',
        completed: false,
        index: 0
    }
];

const createTask = (task) => {
    let todoObj = '';
    if (task.completed === true) {
      todoObj = `
        <article id="${task.index}" class="task-item" draggable="true">
          <input type='checkbox' name='completed' class="checkbox" checked>
          <span class='task-description completed' id="desc-${task.index}" contenteditable>${task.description}</span>
          <i class="bi bi-three-dots-vertical"></i>
          <i class="bi bi-trash hide"></i>
        </article>`;
    } else {
      todoObj = `
          <article  id="${task.index}" class="task-item" draggable="true">
            <input type='checkbox' name='completed' class="checkbox">
            <span class='task-description' id="desc-${task.index}" contenteditable>${task.description}</span>
            <i class="bi bi-three-dots-vertical"></i>
            <i class="bi bi-trash hide"></i>
          </article>`;
    }
  
    todoList.innerHTML += todoObj;
  };
  
export const displayTasks = (list) => {
    todoList.innerHTML = '';
  
    const sortedList = list.sort((a, b) => {
      if (a.index > b.index) {
        return 11;
      }
      if (a.index < b.index) {
        return -1;
      }
      return 0;
    });
  
    sortedList.forEach((task) => {
      createTask(task);
    });
 };

displayTasks(list);
