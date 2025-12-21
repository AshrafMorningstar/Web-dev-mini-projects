class TodoListPremium {
    constructor() {
        this.taskInput = document.getElementById('taskInput');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.addBtn = document.getElementById('addBtn');
        this.tasksList = document.getElementById('tasksList');
        this.themeBtn = document.getElementById('themeBtn');
        this.voiceBtn = document.getElementById('voiceBtn');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.currentFilter = 'all';
        
        this.attachEventListeners();
        this.renderTasks();
        this.updateStats();
    }

    attachEventListeners() {
        this.addBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        this.themeBtn.addEventListener('click', () => this.toggleTheme());
        this.voiceBtn.addEventListener('click', () => this.voiceInput());
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.closest('.filter-btn').dataset.filter));
        });
    }

    addTask() {
        const text = this.taskInput.value.trim();
        const priority = this.prioritySelect.value;
        
        if (!text) return;
        
        this.tasks.push({
            id: Date.now(),
            text,
            priority,
            completed: false,
            createdAt: new Date().toISOString()
        });
        
        this.taskInput.value = '';
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
    }

    renderTasks() {
        this.tasksList.innerHTML = '';
        
        const filtered = this.tasks.filter(task => {
            if (this.currentFilter === 'active') return !task.completed;
            if (this.currentFilter === 'completed') return task.completed;
            return true;
        });
        
        filtered.forEach(task => {
            const taskEl = document.createElement('div');
            taskEl.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskEl.innerHTML = `
                <div class="task-checkbox" onclick="app.toggleTask(${task.id})"></div>
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <span class="priority-badge ${task.priority}">${task.priority}</span>
                <div class="task-actions">
                    <button class="task-btn" onclick="app.deleteTask(${task.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            this.tasksList.appendChild(taskEl);
        });
    }

    setFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.renderTasks();
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const percent = total ? Math.round((completed / total) * 100) : 0;
        
        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('progressPercent').textContent = percent + '%';
    }

    toggleTheme() {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    }

    voiceInput() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            this.taskInput.value = text;
            this.addTask();
        };
        recognition.start();
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

const app = new TodoListPremium();
