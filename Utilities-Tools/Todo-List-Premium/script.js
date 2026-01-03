/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const input = document.getElementById('taskInput');
    if (!input.value.trim()) return;
    tasks.push({ id: Date.now(), text: input.value, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = '';
    render();
}

function render() {
    const list = document.getElementById('tasksList');
    list.innerHTML = '';
    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task-item';
        div.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <span class="task-text">${task.text}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        list.appendChild(div);
    });
}

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    render();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    render();
}

render();
