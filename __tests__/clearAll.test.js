/**
 * @jest-environment jsdom
 */

import MockStorage from '../src/__mocks__/local-storage.js';
import MockDOM from '../src/__mocks__/DOM.js';

describe('Clear All completed items', () => {
  const mockDOM = new MockDOM();
  const mockStorage = new MockStorage();
  const temp = [
    {
      description: 'Sample 1',
      completed: true,
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
  let list = mockStorage.getList();

  const callback = (task) => task.completed === false;
  const todo = list.filter(callback);
  mockStorage.setList(todo);
  list = mockStorage.getList();
  mockDOM.displayTask(list);

  test('Remove completed item', () => {
    expect(list.length).toEqual(2);
    expect(mockDOM.todoList.childElementCount).toEqual(2);
  });
});