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

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	toDoInput = document.querySelector('.todo-input');
	errorInfo = document.querySelector('.error-info');
	addBtn = document.querySelector('.btn-add');
	ulList = document.querySelector('ul');
	popup = document.querySelector('.popup');
	popupInput = document.querySelector('.popup-input');
	popupInfo = document.querySelector('.popup-info');
	popupAddBtn = document.querySelector('.accept');
	popupCloseBtn = document.querySelector('.cancel');
};

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', add);
	ulList.addEventListener('click', checkClick);
	popupCloseBtn.addEventListener('click', closeEdit);
    popupAddBtn.addEventListener('click', changeTodo)
    toDoInput.addEventListener('keyup', enterKey)
};

const add = () => {
	if (toDoInput.value !== '') {
		liItem = document.createElement('li');
		liItem.textContent = toDoInput.value;
		createToolsArea();

		ulList.append(liItem);

		toDoInput.value = '';
		errorInfo.textContent = '';
	} else {
		errorInfo.textContent = 'Musisz podać treść zadania!';
		errorInfo.style.color = 'tomato';
	}
};

const createToolsArea = () => {
	const div = document.createElement('div');
	div.classList.add('tools');
	const completeBtn = document.createElement('button');
	completeBtn.classList.add('complete');
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';

	const editBtn = document.createElement('button');
	editBtn.classList.add('edit');
	editBtn.textContent = 'EDIT';

	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete');
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

	div.append(completeBtn, editBtn, deleteBtn);
	liItem.append(div);
};

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed');
		e.target.classList.toggle('completed');
	} else if (e.target.matches('.edit')) {
        editToDo(e)
	} else if (e.target.matches('.delete')) {
		e.target.closest('li').remove();
	}
};

const editToDo = (e) => {
    
    todoToEdit = e.target.closest('li')
    popupInput.value = todoToEdit.firstChild.textContent
	popup.style.display = 'flex';

	
};

const changeTodo = () => {
    if(popupInput.value !== ''){
        todoToEdit.firstChild.textContent = popupInput.value
       popup.style.display = 'none'
       popupInfo.textContent = ''
    } else {
        popupInfo.textContent = 'Podaj treść!'
        const allli = ulList.querySelectorAll('li')
        if(allli.length === 0 ) {
            errorInfo.textContent = 'Brak zadań na liście'
        }
    }
}

const closeEdit = () => {
	popup.style.display = 'none';
    popupInfo.textContent = ''
};

const enterKey = (e) => {
    if (e.key === 'Enter') {
        add()
    }
}

document.addEventListener('DOMContentLoaded', main);
