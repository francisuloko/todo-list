// eslint-disable-next-line import/no-cycle
import dragAndDrop from './drag-and-drop.js';
import checkboxesEvent, {
  list, save, fixIndex, setList, remove,
} from './status-update.js';

const todoList = document.getElementById('todo-list');
export const items = document.getElementsByClassName('task-item');

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
  checkboxesEvent();
};

export const displayTasks = () => {
  todoList.innerHTML = '';

  const sortedList = list.sort((a, b) => {
    if (a.index > b.index) {
      return 1;
    }
    if (a.index < b.index) {
      return -1;
    }
    return 0;
  });

  sortedList.forEach((task) => {
    createTask(task);
  });
  checkboxesEvent();
  remove();
  save();
};

export function edit() {
  const editables = document.querySelectorAll('[contenteditable]');
  for (let i = 0; i < editables.length; i += 1) {
      editables[i].addEventListener('blur', () => {
        localStorage.setItem('edit', JSON.stringify(editables[i].innerHTML));
        list[i].description = JSON.parse(localStorage.getItem('edit'));
        save();
        displayTasks();
        edit();
      });
  }
}

export function clear() {
  document.getElementById('clear-complete').addEventListener('click', () => {
    const callback = (task) => task.completed === false;
    const todo = list.filter(callback);
    setList(todo);
    fixIndex(list);
    save();
    checkboxesEvent();
  });
}

export function add() {
  document.getElementById('task-entry')
  .addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      let description = document.getElementById('task-entry').value;
      const task = { description, completed: false, index: list.length };
      list.push(task);
      save();
      displayTasks();
      edit();
      checkboxesEvent();
    }
  });
}
