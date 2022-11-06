class Calculator {
	constructor() {
		this.value = 0;
	}
	set(number) {
	this.value = number
	}
	clear() {
		this.value = 0;
	}
	add (number) {
		this.value += number;
	}
	substract (number) {
		this.value -= number;
	}
	divide(number) {
		this.value /= number;
	}
	multiply(number) {
		this.value *= number;
	}
}

module.exports = Calculator