/**
 * @jest-environment jsdom
 */

import MockStorage from '../src/__mocks__/local-storage.js';
import MockDOM from '../src/__mocks__/DOM.js';
import { add } from '../src/crudtodo.js';

describe('Add Function', () => {
  describe('Add new item to LocalStorage', () => {
    const mockStorage = new MockStorage();
    const mockDOM = new MockDOM();
    const list = mockStorage.getList();
    const entryValue = document.getElementById('task-entry');
    const event = new KeyboardEvent('keydown', {
      code: 'Enter',
      key: 'Enter',
      charCode: 13,
      keyCode: 13,
      view: window,
      bubbles: true,
    });
    entryValue.value = 'Sample task 1';

    add();

    if (entryValue.dispatchEvent(event)) {
      list.push({
        description: entryValue.value,
        completed: false,
        index: list.length,
      });
    }

    mockDOM.displayTask(list);

    test('new task added successfully', () => {
      expect(list.length).toBe(1);
    });

    test('New item description valid', () => {
      expect(list[0].description).toBe('Sample task 1');
    });

    test('New item index  valid', () => {
      expect(list[0].index).toBe(0);
    });

    test('New item description valid', () => {
      expect(list[0].completed).toBeFalsy();
    });
  });

  describe('Display task items from LocalStorage', () => {
    const temp = [
      {
        description: 'Sample 1',
        completed: true,
        index: 1,
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
    ];
    const mockDOM = new MockDOM();
    const mockStorage = new MockStorage();
    mockStorage.setList(temp);
    const list = mockStorage.getList();

    mockDOM.displayTask(list);

    test('Items added to DOM', () => {
      const items = document.querySelectorAll('[draggable]');
      expect(items.length).toBe(3);
    });
  });
});

describe('Remove task items from LocalStorage', () => {
  const mockDOM = new MockDOM();
  const mockStorage = new MockStorage();
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
  mockStorage.setList(temp);
  const list = mockStorage.getList();

  mockDOM.displayTask(list);

  test('Remove item from the list', () => {
    const todoList = document.getElementById('todo-list');
    const items = document.querySelectorAll('.task-item');

    list.splice(items[0].id, 1);
    todoList.removeChild(todoList.children[0]);

    expect(list.length).toEqual(2);
    expect(todoList.childElementCount).toEqual(2);
  });
});
