const input = document.getElementById('inputTask');
const addBtn = document.getElementById('addBtn');
const todoList = document.querySelector('.todoList');
const clear = document.getElementById('clearBtn');


input.onkeyup = () => {
    let enteredValue = input.value;
    let getLocalStorage = localStorage.getItem("todo_app");

    if (enteredValue.trim() !== '') {
        addBtn.classList.add('active');
    } else {
        addBtn.classList.remove('active');
    }
}

showTasks();

addBtn.onclick = () => {
    let enteredValue = input.value;
    let getLocalStorage = localStorage.getItem("todo_app");
    
    if (getLocalStorage === null) {
        list = [];
    } else {
        list = JSON.parse(getLocalStorage);
    }

    list.push(enteredValue);
    localStorage.setItem("todo_app", JSON.stringify(list));
    showTasks();
    addBtn.classList.remove('active');
}
function showTasks() {

    let enteredValue = input.value;
    let getLocalStorage = localStorage.getItem("todo_app");
    let list;
    if (getLocalStorage === null) {
        list = [];
    } else {
        list = JSON.parse(getLocalStorage);
    }
    
    const pendingTasks = document.querySelector('.pendingTasks');
    pendingTasks.textContent = list.length;

    if (list.length > 0) {
        clear.classList.add('active');
    } else {
        clear.classList.remove('active');
    }

    let newListItems = '';
    list.forEach((element, index) => {
        newListItems += `<li>${element}<span class="deleteTask" onclick="deleteTask(${index})">delete</span></li>`;
    });

    todoList.innerHTML = newListItems;
    input.value = '';
}

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("todo_app");
    list = JSON.parse(getLocalStorage);

    list.splice(index, 1);
    localStorage.setItem("todo_app", JSON.stringify(list));
    showTasks();
}

clear.onclick = () => {
    localStorage.setItem("todo_app", JSON.stringify([]));
    showTasks();
}