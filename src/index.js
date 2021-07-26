import './style.css';
import checkboxesEvent, { remove } from './status-update.js';
import dragAndDrop from './drag-and-drop.js';
import {
  displayTasks, edit, clear, add,
} from './crudtodo.js';

displayTasks();
checkboxesEvent();
dragAndDrop();
edit();
clear();
add();
