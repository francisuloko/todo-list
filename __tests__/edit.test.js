/**
 * @jest-environment jsdom
 */

import MockStorage from '../src/__mocks__/local-storage.js';
import MockDOM from '../src/__mocks__/DOM.js';

describe('Edit Function', () => {
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
  const enterEvent = new KeyboardEvent('keydown', {
    code: 'Enter',
    key: 'Enter',
    charCode: 13,
    keyCode: 13,
    view: window,
    bubbles: true,
  });
  const clickEvent = new MouseEvent('click', { bubbles: true, cancellable: true });
  const mockDOM = new MockDOM();
  const mockStorage = new MockStorage();
  mockStorage.setList(temp);
  const list = mockStorage.getList();

  mockDOM.displayTask(list);
  const editable = document.querySelector('[contenteditable]');

  if (editable.dispatchEvent(clickEvent)) {
    editable.innerHTML = 'Updated task';
  }

  if (editable.dispatchEvent(enterEvent)) {
    list[0].description = editable.innerHTML;
    mockStorage.setList(list);
    mockDOM.displayTask(mockStorage.list);
  }

  test('Task is edited successfully', () => {
    expect(list[0].description).toBe(editable.innerHTML);
  });
});
