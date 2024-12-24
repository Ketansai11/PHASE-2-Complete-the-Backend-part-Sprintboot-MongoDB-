const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todo-list");
const completedCount = document.getElementById("completed-count");
const totalCount = document.getElementById("total-count");

const API_URL = "http://localhost:8080/api/todos";

let completed = 0;
let total = 0;

async function fetchTodos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch todos");
        }
        const todos = await response.json();
        todos.forEach(todo => addTodoToDOM(todo));
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
}

async function addTodo() {
    const title = todoInput.value.trim();
    if (title === "") {
        alert("Please enter a valid todo item!");
        return;
    }
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
        });
        if (!response.ok) {
            throw new Error("Failed to add todo");
        }
        const newTodo = await response.json();
        addTodoToDOM(newTodo);
        todoInput.value = "";
    } catch (error) {
        console.error("Error adding todo:", error);
    }
}

function addTodoToDOM(todo) {
    const todoItem = document.createElement("li");
    todoItem.className = "todo-item";
    todoItem.setAttribute("data-id", todo.id); // Add unique identifier

    if (todo.completed) {
        todoItem.classList.add("completed"); // Add the completed class if the todo is marked as completed
    }

    todoItem.innerHTML = `
        <span>${todo.title}</span> <!-- The text that will be struck through -->
        <div>
            <button class="check-btn" onclick="toggleTodo('${todo.id}')">✔</button>
            <button class="delete-btn" onclick="deleteTodo('${todo.id}')">🗑</button>
        </div>
    `;

    todoList.appendChild(todoItem);
    total++;
    if (todo.completed) completed++;
    updateStats(); // Update stats when adding a todo
}
async function toggleTodo(id) {
    try {
        // Find the todo item in the DOM
        const todoItem = document.querySelector(`[data-id="${id}"]`);
        const isCompleted = todoItem.classList.contains("completed");

        // Send the updated status to the backend
        const response = await fetch(`${API_URL}/${id}?completed=${!isCompleted}`, {
            method: "PUT",
        });

        if (!response.ok) {
            throw new Error("Failed to update todo");
        }

        // Toggle the `completed` class in the DOM
        todoItem.classList.toggle("completed");

        // Update the completed count
        if (isCompleted) {
            completed--; // If it was completed, decrement the count
        } else {
            completed++; // If it is now completed, increment the count
        }

        updateStats(); // Update the stats on the UI
    } catch (error) {
        console.error("Error toggling todo:", error);
    }
}

async function deleteTodo(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) {
            throw new Error("Failed to delete todo");
        }
        const todoItem = document.querySelector(`[data-id="${id}"]`);
        if (todoItem.classList.contains("completed")) {
            completed--;
        }
        todoList.removeChild(todoItem);
        total--;
        updateStats();
    } catch (error) {
        console.error("Error deleting todo:", error);
    }
}

function updateStats() {
    completedCount.textContent = completed;
    totalCount.textContent = total;
}

addTodoBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});

fetchTodos();
