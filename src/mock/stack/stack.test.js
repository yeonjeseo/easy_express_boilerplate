const Stack = require('./stack');

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  describe('클래스 구성', () => {
    it('스택은 멤버 변수 arr을 갖고 있다.', () => {
      expect(stack).toHaveProperty('arr');
    });

    it('스택은 현재 쌓인 갯수를 확인할 수 있는 커서가 있다.', () => {
      expect(stack).toHaveProperty('cursor');
    });

    it('스택은 push 메서드를 갖고 있다.', () => {
      expect(stack).toHaveProperty('push');
    });

    it('스택은 pop 메서드를 갖고 있다.', () => {
      expect(stack).toHaveProperty('pop');
    });

    it('스택은 peek 메서드를 갖고 있다', () => {
      expect(stack).toHaveProperty('peek');
    });
  });

  describe('push', () => {
    beforeEach(() => {
      stack.push(2);
    });

    it('value를 push하면 배열 길이가 1이어야 한다.', () => {
      expect(stack.arr.length).toBe(1);
    });

    it('value를 push하면 cursor가 1씩 증가해야 한다', () => {
      const initialCursor = stack.cursor;
      stack.push(5);
      expect(stack.cursor).toEqual(initialCursor + 1);
    });
  });

  describe('pop', () => {
    beforeEach(() => {
      stack.push(10);
      stack.push(5);
    });

    it('현재 스택 커서는 2이다', () => {
      expect(stack.cursor).toBe(2);
    });

    it('pop을 수행하면 마지막 요소가 추출되어야 한다', () => {
      const lastValue = stack.arr[stack.cursor - 1];
      const poppedValue = stack.pop();
      expect(poppedValue).toEqual(lastValue);
    });

    it('더 이상 pop을 할 수 없는 경우, 문자열 "empty"를 반환한다.', () => {
      stack.pop();
      stack.pop();
      const result = stack.pop();
      expect(result).toBe('empty');
    });
  });
});
