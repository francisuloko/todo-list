/**
 * @jest-environment jsdom
 */

import MockStorage from '../src/__mocks__/local-storage.js';
import MockDOM from '../src/__mocks__/DOM.js';

describe('Fix index upon drag/drop', () => {
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

  mockDOM.displayTask(list);
  const draggedElem = mockDOM.todoList.children[0].innerHTML;
  const displacedElem = mockDOM.todoList.children[2].innerHTML;
  mockDOM.todoList.children[0].innerHTML = displacedElem;
  mockDOM.todoList.children[2].innerHTML = draggedElem;

  mockDOM.todoList.children[0].id = 2;
  mockDOM.todoList.children[2].id = 0;

  const first = mockDOM.todoList.children[0].id;
  const second = mockDOM.todoList.children[2].id;

  list[first].index = +second;
  list[second].index = +first;

  mockStorage.setList(list);

  test('Task index update', () => {
    expect(list[0].index).toBe(2);
  });

  test('Task index update', () => {
    expect(list[2].index).toBe(0);
  });
});
