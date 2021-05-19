items = [];
selected = 0;

function addItem(name, isChecked) {
	let item = {
		name,
		isChecked
	}

	items.push(item);
}

function submitField() {
	addItem(document.getElementById("input_todo").value, false);
	displayItems(items);

	document.getElementById("input_todo").value = "";
}

function displayItems(items) {
	const container = document.getElementById("todo-container");
	container.innerHTML = "";

	items.forEach((item, index) => {
		let check = item.isChecked ? "&#10004;" : "";
		let html = `<div class="todo-item">
						<div class="todo-check" onclick="checkItem(${index})">${check}</div>
						<span>${item.name}</span>
						<div class="todo-delete" onclick="deleteItem(${index})">&#10006;</div>
					</div>`;

		if (selected == 0 || (selected == 1 && !item.isChecked) || (selected == 2 && item.isChecked)) {
			container.innerHTML += html;
		}
	});

	if (items.length >= 1) {
		let html = `
			<div class="bar">
				<span class="bar-left">${items.filter((item) => item.isChecked == false).length} items left</span>
				<span class="bar-buttons">
					<span class="bar-button" onclick="setAll()">All</span>
					<span class="bar-button" onclick="setActive()">Active</span>
					<span class="bar-button" onclick="setCompleted()">Completed</span>
				</span>
				<span class="bar-clear"><span class="span-clear" onclick="clearCompleted()">Clear completed</span></span>
			</div>`;

		container.innerHTML += html;
	}
}

displayItems(items);

function checkItem(index) {
	items[index].isChecked = !items[index].isChecked;
	displayItems(items);
}

function deleteItem(index) {
	items.splice(index, 1);
	displayItems(items);
}

function clearCompleted() {
	items = items.filter((item) => item.isChecked == false);
	displayItems(items);
}

function setAll() {
	selected = 0;
	displayItems(items);
}

function setActive() {
	selected = 1;
	displayItems(items);
}

function setCompleted() {
	selected = 2;
	displayItems(items);
}
