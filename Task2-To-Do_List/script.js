const inputBox = document.getElementById("input-box");
const prioritySelect = document.getElementById("priority-select");
const dueDateInput = document.getElementById("due-date");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '' || dueDateInput.value === '') {
        alert("You should write something and select a due date!");
    } else {
        let li = document.createElement("li");
        li.className = prioritySelect.value;

        let taskContent = document.createElement("span");
        taskContent.className = "task-content";
        taskContent.innerHTML = inputBox.value;
        li.appendChild(taskContent);

        let dueDateSpan = document.createElement("span");
        dueDateSpan.className = "due-date";
        dueDateSpan.innerHTML = `Due: ${dueDateInput.value}`;
        li.appendChild(dueDateSpan);

        let span = document.createElement("span");
        span.className = "delete-button";
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);
    }
    inputBox.value = "";
    dueDateInput.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.classList.contains("delete-button")) { 
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function filterTasks(priority) {
    let tasks = listContainer.getElementsByTagName('li');
    for (let task of tasks) {
        if (priority === 'all' || task.classList.contains(priority)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    }
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    listContainer.dispatchEvent(new Event('click')); 
}

showTask();
