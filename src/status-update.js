import { list, save } from './storage.js';

export default function checkboxesEvent() {
  let temp = list;
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
      save(temp);
    });
  }
}
