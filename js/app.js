/* ==========================
   LOGIN VALIDATION
========================== */

const loginForm =
document.getElementById("loginForm");

const message =
document.getElementById("message");

function validateLogin(email,password){

    if(email === "" || password === ""){
        return "All fields are required";
    }

    return "Login Successful";
}


/* ==========================
   ES6 CLASS
========================== */

class User{

    constructor(email){
        this.email = email;
    }

    getGreeting(){
        return `Welcome ${this.email}`;
    }

}

loginForm.addEventListener("submit",(event)=>{

    event.preventDefault();

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const result =
    validateLogin(email,password);

    if(result === "Login Successful"){

        const user =
        new User(email);

        message.textContent =
        user.getGreeting();

    }
    else{

        message.textContent =
        result;

    }

});


/* ==========================
   TASK MANAGER
========================== */

const taskInput =
document.getElementById("taskInput");

const addTaskBtn =
document.getElementById("addTaskBtn");

const taskList =
document.getElementById("taskList");

let tasks =
JSON.parse(
localStorage.getItem("tasks")
) || [];

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const li =
        document.createElement("li");

        li.classList.add("task-item");

        li.innerHTML = `
            <span>${task.name}</span>

            <button
            class="delete-btn"
            onclick="deleteTask(${index})">
            Delete
            </button>
        `;

        taskList.appendChild(li);

    });

}

function addTask(){

    const taskName =
    taskInput.value.trim();

    if(taskName === ""){
        return;
    }

    tasks.push({
        name: taskName
    });

    saveTasks();

    taskInput.value = "";

    renderTasks();

}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    renderTasks();

}

addTaskBtn.addEventListener(
    "click",
    addTask
);


/* ==========================
   EXPENSE MANAGER
========================== */

const expenseName =
document.getElementById("expenseName");

const expenseAmount =
document.getElementById("expenseAmount");

const addExpenseBtn =
document.getElementById("addExpenseBtn");

const expenseList =
document.getElementById("expenseList");

const totalExpense =
document.getElementById("totalExpense");

let expenses =
JSON.parse(
localStorage.getItem("expenses")
) || [];

function saveExpenses(){

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

}

function renderExpenses(){

    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach(expense=>{

        total += expense.amount;

        const li =
        document.createElement("li");

        li.classList.add("expense-item");

        li.innerHTML = `
            <span>${expense.name}</span>
            <span>₹${expense.amount}</span>
        `;

        expenseList.appendChild(li);

    });

    totalExpense.textContent = total;

}

function addExpense(){

    const name =
    expenseName.value.trim();

    const amount =
    Number(expenseAmount.value);

    if(name === "" || amount <= 0){
        return;
    }

    expenses.push({
        name:name,
        amount:amount
    });

    saveExpenses();

    expenseName.value = "";
    expenseAmount.value = "";

    renderExpenses();

}

addExpenseBtn.addEventListener(
    "click",
    addExpense
);


/* ==========================
   FETCH API - QUOTES
========================== */

const quoteText =
document.getElementById("quoteText");

const quoteBtn =
document.getElementById("quoteBtn");

async function fetchQuote(){

    try{

        const response =
        await fetch(
            "https://dummyjson.com/quotes/random"
        );

        const data =
        await response.json();

        quoteText.textContent =
        `"${data.quote}" - ${data.author}`;

    }
    catch(error){

        quoteText.textContent =
        "Unable to load quote.";

    }

}

quoteBtn.addEventListener(
    "click",
    fetchQuote
);


/* ==========================
   DARK MODE
========================== */

const themeBtn =
document.getElementById("themeBtn");

function loadTheme(){

    const savedTheme =
    localStorage.getItem("theme");

    if(savedTheme === "dark"){

        document.body.classList.add(
            "dark-mode"
        );

    }

}

function toggleTheme(){

    document.body.classList.toggle(
        "dark-mode"
    );

    if(
        document.body.classList.contains(
            "dark-mode"
        )
    ){

        localStorage.setItem(
            "theme",
            "dark"
        );

    }
    else{

        localStorage.setItem(
            "theme",
            "light"
        );

    }

}

themeBtn.addEventListener(
    "click",
    toggleTheme
);


/* ==========================
   INITIAL LOAD
========================== */

renderTasks();
renderExpenses();
fetchQuote();
loadTheme();