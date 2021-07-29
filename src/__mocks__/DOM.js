export default class MockDOM {
  constructor() {
    document.body.innerHTML = `
    <form>
      <input type="text" name="task-entry" id="task-entry" />
    </form>
    <div id="todo-list"></div>`;
    this.todoList = document.getElementById('todo-list');
  }

  displayTask(list) {
    list.forEach((task) => {
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

      this.todoList.innerHTML += todoObj;
    });
  }
}
