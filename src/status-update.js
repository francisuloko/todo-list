// eslint-disable-next-line import/no-cycle
import {
  clear, displayTasks,
} from './crudtodo.js';
// eslint-disable-next-line import/no-mutable-exports
export let list = [];

if (localStorage.getItem('list')) {
  list = JSON.parse(localStorage.getItem('list'));
}

export const save = () => {
  localStorage.setItem('list', JSON.stringify(list));
};

export function fixIndex(list) {
  for (let i = 0; i < list.length; i += 1) {
    list[i].index = i;
  }
}

export function setList(filter) {
  list = [];
  for (let i = 0; i < filter.length; i += 1) {
    list.push(filter[i]);
  }
  save();
  displayTasks();
}

export default function checkboxesEvent() {
  const temp = list;
  const checkboxes = document.getElementsByClassName('checkbox');
  for (let i = 0; i < checkboxes.length; i += 1) {
    checkboxes[i].addEventListener('change', () => {
      if (temp[i].completed === true) {
        temp[i].completed = false;
        document.getElementById(`desc-${temp[i].index}`).classList.remove('completed');
      } else {
        temp[i].completed = true;
        document.getElementById(`desc-${temp[i].index}`).classList.add('completed');
      }
      setList(temp);
      checkboxesEvent();
      clear();
    });
  }
}

export function remove() {
  const editables = document.querySelectorAll('[contenteditable]');
  const temp = list;
  for (let i = 0; i < editables.length; i += 1) {
    editables[i].parentNode.children[2].addEventListener('click', () => {
      editables[i].parentNode.children[3].classList.add('show');
      editables[i].parentNode.children[2].classList.add('hide');
      editables[i].nextElementSibling.nextElementSibling.addEventListener('click', () => {
        temp.splice(i, 1);
        fixIndex(temp);
        setList(temp);
        save();
      });
    });
  }
}
