document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const clearTasksBtn = document.getElementById("clearTasks");
const quoteElement = document.getElementById("quote");
const toggleModeBtn = document.getElementById("toggleMode");


addTaskBtn.addEventListener("click", addTask);
clearTasksBtn.addEventListener("click", clearCompletedTasks);
// toggleModeBtn.addEventListener("click", toggleDarkMode); 

fetch("https://api.quotable.io/random").then(response => response.json())
                .then(data => quoteElement.innerText = `"${data.content}"- ${data.author}`)
                .catch(()=>quoteElement.innerText = "Failed to load");

function addTask(){

    // console.log(taskInput.value);
    if(taskInput.value.trim() === "") return;
    const task = {text : taskInput.value , completed : false};
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));   
    taskInput.value = "";
    loadTasks();
    
}

function loadTasks(){
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        li.style.textDecoration = task.completed ? "line-through" : "none";
        li.addEventListener("click", ()=> toogleTask(index));
        taskList.appendChild(li);
    }); 
}


function toogleTask(index){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function clearCompletedTasks(){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => !task.completed);
    localStorage.setItem("tasks", JSON.stringify(tasks));   
    loadTasks();
}


document.addEventListener("DOMContentLoaded", () => {
    const toggleModeBtn = document.getElementById("toggleMode");
    const body = document.body;


    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark");
        body.classList.replace("bg-white", "bg-gray-900");
        body.classList.replace("text-gray-900", "text-white");
    }

    toggleModeBtn.addEventListener("click", () => {
        if (body.classList.contains("dark")) {
            // Light Mode
            body.classList.remove("dark");
            body.classList.replace("bg-gray-900", "bg-white");
            body.classList.replace("text-white", "text-gray-900");
            localStorage.setItem("darkMode", "disabled");
        } else {
            // Dark Mode
            body.classList.add("dark");
            body.classList.replace("bg-white", "bg-gray-900");
            localStorage.setItem("darkMode", "enabled");
        }
    });
});
