window.addEventListener("load", initBody, false);

function initBody() {
	var button = document.getElementById("calculate");
	button.addEventListener("click", calculate, false);
	button.addEventListener("click", zebra, false);
}

function calculate() {
	var a = Number(document.getElementsByName("A_coef")[0].value);
	var b = Number(document.getElementsByName("B_coef")[0].value);
	var c = Number(document.getElementsByName("C_coef")[0].value);

	var inputData = document.getElementById("input_data");
	var newDiv = document.createElement("div");
	newDiv.setAttribute("id", "illegal_coef");
	var text = document.createTextNode("Не правильно введённые данные");
	newDiv.appendChild(text);

	if (isNaN(a) || isNaN(b) || isNaN(c)) {
		inputData.parentElement.insertBefore(newDiv, inputData.nextSibling);
		return;
	}

	var illegalCoef = document.getElementById("illegal_coef");
	if (illegalCoef != null) {
		illegalCoef.parentElement.removeChild(illegalCoef);
	}

	var x1 = 0;
	var x2 = 0;

	if (a === 0 && b === 0) {
		inputData.parentElement.insertBefore(newDiv, inputData.nextSibling);
		return;
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
				text.nodeValue = "Мнимые корни";
				inputData.parentElement.insertBefore(newDiv, inputData.nextSibling);
				return;
			}
			x1 = Math.sqrt(-c / a);
			x2 = -x1;
		} else {
			var d = b ** 2 - 4 * a * c;
			if (d < 0) {
				text.nodeValue = "Отрицательный дискриминант";
				inputData.parentElement.insertBefore(newDiv, inputData.nextSibling);
				return;
			}
			x1 = (-b + Math.sqrt(d)) / (2 * a);
			x2 = (-b - Math.sqrt(d)) / (2 * a);
		}
	}

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
	document.getElementsByName("x1")[0].value = String(x1);
	document.getElementsByName("x2")[0].value = String(x2);
}

function zebra() {
	var table = document.getElementsByTagName("tr");
	for (var i = 2; i < table.length; i++) {
		if (i % 2 === 0){
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
