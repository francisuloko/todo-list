const todoList = document.getElementById('todo-list');
let storage;
export const listArray = [
  {
    description: 'Wake up',
    completed: false,
    index: 0,
  },
  {
    description: 'Breakfast',
    completed: false,
    index: 1,
  },
  {
    description: 'Write some code',
    completed: false,
    index: 2,
  },
  {
    description: 'Request Code Review',
    completed: false,
    index: 3,
  },
  {
    description: 'Get some rest',
    completed: false,
    index: 4,
  },
];

export const save = (change) => {
  localStorage.setItem('list', JSON.stringify(change));
};

if (localStorage.getItem('list')) {
  storage = JSON.parse(localStorage.getItem('list'));
} else {
  save(listArray);
}

export const list = storage;

export const createTask = (task) => {
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
};

export function fixIndex(list) {
  for (let i = 0; i < list.length; i += 1) {
    list[i].index = i;
  }
}

const d = document.querySelectorAll('[draggable]')
console.log(d);
