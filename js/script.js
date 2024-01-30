let todoInput;
let todoList;
let addBtn;
let errorInfo;
let newTodo;

let popup;
let popupInfo;
let todoToEdit;
let popupInput;
let popupConfirmBtn;
let popupCancelBtn;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	// tutaj pobieram wszystkie elementy

	todoInput = document.querySelector('.todo-input');
	todoList = document.querySelector('.todo-list');
	addBtn = document.querySelector('.add-btn');
	errorInfo = document.querySelector('.error-info');

	popup = document.querySelector('.popup');
	popupInput = document.querySelector('.popup-input');
	popupConfirmBtn = document.querySelector('.popup-confirm');
	popupCancelBtn = document.querySelector('.popup-cancel');
	popupInfo = document.querySelector('.popup-info')
};

const prepareDOMEvents = () => {
	// tutaj wszystkie listenery

	addBtn.addEventListener('click', newTask);
	todoList.addEventListener('click', checkClick);
	popupCancelBtn.addEventListener('click', closePopup);
    popupConfirmBtn.addEventListener('click', changeTodoText)
    todoInput.addEventListener('keyup', enterCheck)
};

const newTask = () => {
	if (todoInput.value !== '') {
		newTodo = document.createElement('li');
		newTodo.textContent = todoInput.value;
		newTodo.classList.add('todo-list-item');
		toolsPanel();
		todoList.append(newTodo);
		todoInput.value = '';
		errorInfo.textContent = '';
	} else {
		errorInfo.textContent = 'Wpisz treść zadania!';
	}
};

const toolsPanel = () => {
	const toolsBox = document.createElement('div');
	toolsBox.classList.add('tools');

	const completeBtn = document.createElement('button');
	completeBtn.classList.add('complete');
	completeBtn.innerHTML = '<i class="fa-solid fa-check-double"></i>';

	const editBtn = document.createElement('button');
	editBtn.classList.add('edit');
	editBtn.textContent = 'edit';

	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete');
	deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

	toolsBox.append(completeBtn, editBtn, deleteBtn);

	newTodo.append(toolsBox);
};

const checkClick = (e) => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed');
		e.target.classList.toggle('completed-btn');
	} else if (e.target.matches('.edit')) {
		
        editTodo(e)

	} else if (e.target.matches('.delete')) {

        deleteTodo(e)

	}
};

const editTodo = (e) => {
    todoToEdit = e.target.closest('li')
    popupInput.value = todoToEdit.firstChild.textContent
    popup.classList.add('show-popup')
}

const closePopup = () => {
    popup.classList.remove('show-popup')
    popupInfo.textContent = ''
}


const changeTodoText = () => {
    if(popupInput.value !== '') {
        todoToEdit.firstChild.textContent = popupInput.value
        closePopup()
        popupInfo.textContent = ''
    } else {
        popupInfo.textContent = 'Nie możesz zatwierdzić pustego zadania!'
    }
}

const deleteTodo = (e) => {
    e.target.closest('li').remove()

    const liItems = document.querySelectorAll('li')

    if(liItems.length === 0) {
        errorInfo.textContent = 'Brak zadań na liście.'
    } else {
        errorInfo.textContent = ''
    }

}

const enterCheck = (e) => {
    if(e.key === 'Enter') {
        newTask()
    }
}




document.addEventListener('DOMContentLoaded', main);
