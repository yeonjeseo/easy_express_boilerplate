const Calculator = require('../Calculator.js')

const calculator = new Calculator();

test('계산기 초기 값은 0이다', () => {
	expect(calculator.value).toBe(0)
})

test('계산기 초기 값은 특정 값으로 세팅할 수 있다.', () => {
	calculator.set(10)
	expect(calculator.value).toBe(10)
})

test('계산기는 0으로 초기화 할 수 있다.', () => {
	calculator.clear()
	expect(calculator.value).toBe(0)
})

test('10+15 = 25', () => {
	calculator.set(10);
	calculator.add(15);
	expect(calculator.value).toBe(25)
})

test('25 - 18 = 7', () => {
	calculator.set(25);
	calculator.substract(18);
	expect(calculator.value).toBe(7)
})

test('25 * 4 = 100', () => {
	calculator.set(25);
	calculator.multiply(4);
	expect(calculator.value).toBe(100)
})

test('22 / 2 = 11', () => {
	calculator.set(22);
	calculator.divide(2);
	expect(calculator.value).toBe(11)
})