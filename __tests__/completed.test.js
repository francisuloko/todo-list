/**
 * @jest-environment jsdom
 */

import MockStorage from '../src/__mocks__/local-storage.js';
import MockDOM from '../src/__mocks__/DOM.js';

describe('Update task completion', () => {
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

  const change = new Event('change');
  let element = '';
  const mockDOM = new MockDOM();
  const mockStorage = new MockStorage();
  mockStorage.setList(temp);
  const list = mockStorage.getList();

  mockDOM.displayTask(list);
  element = document.querySelector('.checkbox');

  if (element.dispatchEvent(change)) {
    list[0].completed = true;
    mockStorage.setList(list);
    mockDOM.displayTask(mockStorage.list);
  }

  test('Task completion is updated successfully', () => {
    expect(list[0].completed).toBeTruthy();
  });
});