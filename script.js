let toDoInput;
let errorInfo;
let addBtn;
let ulList;
let liItem;
let deleteBtn;

let popup;
let popupInfo;
let todoToEdit;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

const prepareDOMElements = () => {
	toDoInput = document.querySelector('.todo-input');
	errorInfo = document.querySelector('.error-info');
	addBtn = document.querySelector('.btn-add');
	ulList = document.querySelector('.todolist ul');

	popup = document.querySelector('.popup');
	popupInfo = document.querySelector('.popup-info');
	popupInput = document.querySelector('.popup-input');
	popupAddBtn = document.querySelector('.accept');
	popupCloseBtn = document.querySelector('.cancel');
};

const addNewToDo = () => {
	if (toDoInput.value !== '') {
		liItem = document.createElement('li');
		liItem.textContent = toDoInput.value;
		createToolsArea();
		ulList.append(liItem);

		toDoInput.value = '';
		errorInfo.textContent = '';
	} else {
		errorInfo.textContent = 'Wprowadź treść zadania!';
		errorInfo.style.color = 'tomato';
	}
};

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewToDo);
	ulList.addEventListener('click', checkClick);
	popupCloseBtn.addEventListener('click', popupClose);
	popupAddBtn.addEventListener('click', changeToDoText);
	toDoInput.addEventListener('keyup', enterKeyCheck);
};

const createToolsArea = () => {
	const toolsDiv = document.createElement('div');
	toolsDiv.classList.add('tools');
	liItem.append(toolsDiv);

	const completeBtn = document.createElement('button');
	completeBtn.classList.add('complete');
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';

	const editBtn = document.createElement('button');
	editBtn.classList.add('edit');
	editBtn.textContent = 'EDIT';

	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete');
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

	toolsDiv.append(completeBtn, editBtn, deleteBtn);
};

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed');
		e.target.classList.toggle('completed');
	} else if (e.target.matches('.edit')) {
		editToDo(e);
	} else if (e.target.matches('.delete')) {
		deleteToDo(e);
	}
};

const editToDo = e => {
	todoToEdit = e.target.closest('li');
	popupInput.value = todoToEdit.firstChild.textContent;
	popup.style.display = 'flex';
};

const popupClose = () => {
	popup.style.display = 'none';
	popupInfo.textContent = '';
};

const changeToDoText = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value;
		popup.style.display = 'none';
		popupInfo.textContent = '';
	} else {
		popupInfo.textContent = 'Musisz podać treść zadania!';
		popupInfo.style.color = 'tomato';
	}
};

const deleteToDo = e => {
	e.target.closest('li').remove();
	if (ulList.childElementCount === 0) {
		errorInfo.textContent = 'Brak zadań na liście.';
	}
};

const enterKeyCheck = e => {
	if (e.key === 'Enter') {
		addNewToDo();
	}
};

document.addEventListener('DOMContentLoaded', main);
