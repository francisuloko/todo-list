export default class LocalStorage {
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
