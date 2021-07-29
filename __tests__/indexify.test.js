/**
 * @jest-environment jsdom
 */

 import MockStorage from '../src/__mocks__/local-storage.js';
 import MockDOM from '../src/__mocks__/DOM.js';
 
 describe("Fix index upon drag/drop", () => {
     const temp = [
       {
         description: 'Sample 1',
         completed: false,
         index: 0,
       },
       {
         description: 'Sample 2',
         completed: false,
         index: 1,
       },
       {
         description: 'Sample 3',
         completed: false,
         index: 2,
       },
     ];
     const mockDOM = new MockDOM();
     const mockStorage = new MockStorage();
     mockStorage.setList(temp);
     const list = mockStorage.getList();
     
     mockDOM.displayTask(list)
    
    console.log(mockDOM.todoList.children[0])
     const draggedElem = mockDOM.todoList.children[0]
     const displacedElem = mockDOM.todoList.children[2]
     mockDOM.todoList.children[0] = displacedElem;
     mockDOM.todoList.children[2] = draggedElem;

    const editable = document.querySelector('[contenteditable]');
 
     
   
     test("Task is edited successfully", () => {
       expect(list[0].description).toBe(editable.innerHTML);
     });
 });
 