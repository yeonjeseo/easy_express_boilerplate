class Stack {
  constructor() {
    this.arr = [];
    this.cursor = 0;
  }

  push(value) {
    this.arr.push(value);
    this.cursor += 1;
  }

  pop() {
    if (this.cursor === 0) return 'empty';
    const result = this.arr.pop();
    this.cursor -= 1;
    return result;
  }

  peek() {
    if (this.cursor === 0) return 'empty';
    return this.arr[this.cursor - 1];
  }

  size() {
    return this.cursor;
  }
}

module.exports = Stack;
