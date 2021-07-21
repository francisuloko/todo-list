import checkboxesEvent from './status-update.js';
import { displayTasks, list, save } from './storage.js';

let temp = list;

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
      const taskIndex = temp[dragged.id].index;
      temp[dragged.id].index = temp[event.target.id].index;
      temp[event.target.id].index = taskIndex;
      dragged.id = temp[dragged.id].index;
      event.target.id = temp[event.target.id].index;
    }
    displayTasks();
    save(temp);
    checkboxesEvent();
  }, false);
}
