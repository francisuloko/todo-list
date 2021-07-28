import MockStorage from '../src/__mocks__/mock-storage.js'

describe("Add Function", () => {
  document.body.innerHTML = `
       <form>
         <input type="text" name="task-entry" id="task-entry" />
       </form>
       <div id="todo-list"></div>`;

    describe("Add new item to LocalStorage", () => {
      const mockStorage = new MockStorage();
      let list = mockStorage.getList()
      const entryValue = document.getElementById('task-entry');
      entryValue.value = "Sample task 1";
      
      const event = new KeyboardEvent('keydown', {
          code: 'Enter',
          key: 'Enter',
          charCode: 13,
          keyCode: 13,
          view: window,
          bubbles: true
      });     

      if(entryValue.dispatchEvent(event)){
        list.push({
          description: entryValue.value,
          completed: false,
          index: list.length,
        });
      };
        
      test('new task added successfully', () => {
        expect(list.length).toBe(1);
      });

      test('New item description valid', () => {
        expect(list[0].description).toBe('Sample task 1');
      });

      test('New item description valid', () => {
        expect(list[0].index).toBe(0);
      });

      test('New item description valid', () => {
        expect(list[0].completed).toBeFalsy();
      });

    });

    describe("Display task items from LocalStorage", () => {
      document.body.innerHTML = `
       <form>
         <input type="text" name="task-entry" id="task-entry" />
       </form>
      <div id="todo-list"></div>`;
      
      const mockStorage = new MockStorage();
      let temp = [
        {
          description: 'Sample 1',
          completed: true,
          index: 1
        },
        {
          description: 'Sample 2',
          completed: false,
          index: 2,
        },
        {
          description: 'Sample 3',
          completed: false,
          index: 3,
        },
      ]
      mockStorage.setList(temp);
      let list = mockStorage.getList()
      let todoList = document.getElementById('todo-list');

      list.forEach(task => {
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
      })

      test("Items added to DOM", () => {
        let items = document.querySelectorAll('[draggable]');
        expect(items.length).toBe(3)
      });
    });
});

describe("Remove task items from LocalStorage", () => {
  document.body.innerHTML = `
   <form>
     <input type="text" name="task-entry" id="task-entry" />
   </form>
  <div id="todo-list"></div>`;
  
  const mockStorage = new MockStorage();
  let temp = [
    {
      description: 'Sample 1',
      completed: true,
      index: 1
    },
    {
      description: 'Sample 2',
      completed: false,
      index: 2,
    },
    {
      description: 'Sample 3',
      completed: false,
      index: 3,
    },
  ]
  mockStorage.setList(temp);
  let list = mockStorage.getList()
  let todoList = document.getElementById('todo-list');

  list.forEach(task => {
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
    
  })
  test('Remove item from the list', () => {
    list.splice(2, 1);     
    expect(list.length).toEqual(2);
  })
})
