let todoInput;
let errorInfo;
let addBtn;
let ulList;
let newTask;

let popupDiv;
let popupInfo;
let todoToEdit;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

const errorEmptyInputValue = 'Musisz podać treść zadania!';
const infoEmptyList = 'Brak zadań na liście';
const taskEdit = 'EDIT';

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input');
	errorInfo = document.querySelector('.error-info');
	addBtn = document.querySelector('.btn-add');
	ulList = document.querySelector('ul');
	popupDiv = document.querySelector('.popup');
	popupInput = document.querySelector('.popup-input');
	popupInfo = document.querySelector('.popup-info');
	popupAddBtn = document.querySelector('.accept');
	popupCloseBtn = document.querySelector('.cancel');
};

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTask);
	ulList.addEventListener('click', checkClickedElement);
	popupCloseBtn.addEventListener('click', closeEdit);
	popupAddBtn.addEventListener('click', changeTodo);
	todoInput.addEventListener('keyup', enterKey);
};

const addNewTask = () => {
	if (todoInput.value !== '') {
		newTask = document.createElement('li');
		newTask.textContent = todoInput.value;
		createToolsArea();

		ulList.append(newTask);

		todoInput.value = '';
		errorInfo.textContent = '';
	} else {
		errorInfo.textContent = errorEmptyInputValue;
		errorInfo.classList.remove('empty-list');
		errorInfo.classList.add('error-message');
	}
};

const createToolsArea = () => {
	const toolsDiv = document.createElement('div');
	toolsDiv.classList.add('tools');
	const completeBtn = document.createElement('button');
	completeBtn.classList.add('complete');
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';

	const editBtn = document.createElement('button');
	editBtn.classList.add('edit');
	editBtn.textContent = taskEdit;

	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete');
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

	toolsDiv.append(completeBtn, editBtn, deleteBtn);
	newTask.append(toolsDiv);
};

const checkClickedElement = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed');
		e.target.classList.toggle('completed');
	} else if (e.target.matches('.edit')) {
		editToDo(e);
	} else if (e.target.matches('.delete')) {
		deleteTodo(e);
	}
};

const editToDo = e => {
	todoToEdit = e.target.closest('li');
	popupInput.value = todoToEdit.firstChild.textContent;
	popupDiv.style.display = 'flex';
};

const changeTodo = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value;
		popupDiv.style.display = 'none';
		popupInfo.textContent = '';
	} else {
		popupInfo.textContent = errorEmptyInputValue;
		popupInfo.classList.add('error-message');
	}
};

const closeEdit = () => {
	popupDiv.style.display = 'none';
	popupInfo.textContent = '';
};

const deleteTodo = e => {
	e.target.closest('li').remove();
	if (ulList.children.length === 0) {
		errorInfo.textContent = infoEmptyList;
		errorInfo.classList.add('empty-list');
	}
};

const enterKey = e => {
	if (e.key === 'Enter') {
		addNewTask();
	}
};

document.addEventListener('DOMContentLoaded', main);
