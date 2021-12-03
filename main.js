window.addEventListener("load", initBody, false);

function initBody() {
	var button = document.getElementById("calculate");
	button.addEventListener("click", calculate, false);
	button.addEventListener("click", zebra, false);
}

function calculate() {
	removeIllegalCoef();

	var coefficients = getCoefficients();
	var x1x2 = calculateX1X2(coefficients);

	if (typeof x1x2 === "string") {
		insertIllegalCoef(x1x2);
		return;
	}

	addElementsIntoTable(coefficients, x1x2);
	setX1X2(x1x2);
}

function getCoefficients() {
	var a = Number(document.getElementsByName("A_coef")[0].value);
	var b = Number(document.getElementsByName("B_coef")[0].value);
	var c = Number(document.getElementsByName("C_coef")[0].value);
	return {a: a, b: b, c: c};
}

function calculateX1X2(coefficients) {
	var a = coefficients.a;
	var b = coefficients.b;
	var c = coefficients.c;

	if (isNaN(a) || isNaN(b) || isNaN(c)) {
		return "Не правильно введённые данные";
	}

	var x1 = 0;
	var x2 = 0;

	if (a === 0 && b === 0) {
		return "Не правильно введённые данные";
	} else if ((a === 0 || b === 0) && c === 0) {
		x1 = 0;
		if (a !== 0) {
			x2 = 0;
		} else {
			x2 = ""
		}
	} else if (a !== 0 && b !== 0 && c === 0) {
		x1 = 0;
		x2 = -b / a;
	} else if (c !== 0) {
		if (a === 0) {
			x1 = -c / b;
			x2 = "";
		} else if (b === 0) {
			if (-c / a < 0) {
				return "Мнимые корни";
			}
			x1 = Math.sqrt(-c / a);
			x2 = -x1;
		} else {
			var d = b ** 2 - 4 * a * c;
			if (d < 0) {
				return "Отрицательный дискриминант";
			}
			x1 = (-b + Math.sqrt(d)) / (2 * a);
			x2 = (-b - Math.sqrt(d)) / (2 * a);
		}
	}
	return {x1: x1, x2: x2};
}

function insertIllegalCoef(str) {
	var inputData = document.getElementById("input_data");
	var newDiv = document.createElement("div");
	newDiv.setAttribute("id", "illegal_coef");
	var text = document.createTextNode(str);
	newDiv.appendChild(text);
	inputData.parentElement.insertBefore(newDiv, inputData.nextSibling);
}

function removeIllegalCoef() {
	var illegalCoef = document.getElementById("illegal_coef");
	if (illegalCoef != null) {
		illegalCoef.parentElement.removeChild(illegalCoef);
	}
}

function addElementsIntoTable(coefs, x1x2) {
	var a = coefs.a;
	var b = coefs.b;
	var c = coefs.c;
	var x1 = x1x2.x1;
	var x2 = x1x2.x2;
	var table = document.getElementById("results");
	var newTr = document.createElement("tr");
	newTr.addEventListener("click", removeElement, false)
	newTr.addEventListener("click", zebra, false)
	var newTdA = document.createElement("td");
	var newTdB = document.createElement("td");
	var newTdC = document.createElement("td");
	var newTdResX1 = document.createElement("td");
	var newTdResX2 = document.createElement("td");
	var textA = document.createTextNode(String(a));
	var textB = document.createTextNode(String(b));
	var textC = document.createTextNode(String(c));
	var textResX1 = document.createTextNode(String(x1));
	var textResX2 = document.createTextNode(String(x2));
	newTdA.appendChild(textA);
	newTdB.appendChild(textB);
	newTdC.appendChild(textC);
	newTdResX1.appendChild(textResX1);
	newTdResX2.appendChild(textResX2);
	newTr.appendChild(newTdA);
	newTr.appendChild(newTdB);
	newTr.appendChild(newTdC);
	newTr.appendChild(newTdResX1);
	newTr.appendChild(newTdResX2);
	table.appendChild(newTr);
}

function setX1X2(x1x2) {
	document.getElementsByName("x1")[0].value = String(x1x2.x1);
	document.getElementsByName("x2")[0].value = String(x1x2.x2);
}

function zebra() {
	var table = document.getElementsByTagName("tr");
	for (var i = 2; i < table.length; i++) {
		if (i % 2 === 0) {
			table[i].setAttribute("class", "first_color");
		} else {
			table[i].setAttribute("class", "second_color");
		}
	}
}

function removeElement(event) {
	var table = document.getElementsByTagName("table")[0];
	table.removeChild(event.currentTarget);
}
