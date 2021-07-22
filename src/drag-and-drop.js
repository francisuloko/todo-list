import checkboxesEvent, { list } from './status-update.js';
import { displayTasks, remove } from './crudtodo.js';

export default function dragAndDrop() {
  let dragged;

  document.addEventListener('dragstart', (event) => {
    dragged = event.target;
    event.dataTransfer.setData('text', event.target.classList);
  }, false);

  document.addEventListener('dragover', (event) => {
    event.preventDefault();
  }, false);

  document.addEventListener('drop', (event) => {
    event.preventDefault();
    if (event.dataTransfer.getData('text') === 'task-item') {
      const taskIndex = list[dragged.id].index;
      list[dragged.id].index = list[event.target.id].index;
      list[event.target.id].index = taskIndex;
      dragged.id = list[dragged.id].index;
      event.target.id = list[event.target.id].index;
    }
    displayTasks();
    checkboxesEvent();
  }, false);
}
