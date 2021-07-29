export default class MockStorage {
  constructor() {
    this.list = [];
  }

  setList(item) {
    this.list = item;
  }

  getList() {
    return this.list;
  }
}
