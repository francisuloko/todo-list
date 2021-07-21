import './style.css';
import { displayTasks, listArray, save } from './storage.js';
import dragAndDrop from './drag-and-drop.js';
import checkboxesEvent from './status-update.js';

displayTasks();
checkboxesEvent();
dragAndDrop();
