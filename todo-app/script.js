// To-Do App - Local Storage Implementation
class ToDoApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.editingTaskId = null;
        this.storageKey = 'todoApp_tasks';
        
        this.initElements();
        this.loadTasks();
        this.setupEventListeners();
        this.render();
        this.updateFooterDate();
    }

    // Initialize DOM elements
    initElements() {
        this.taskInput = document.getElementById('taskInput');
        this.addBtn = document.getElementById('addBtn');
        this.tasksContainer = document.getElementById('tasksContainer');
        this.emptyState = document.getElementById('emptyState');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.clearBtn = document.getElementById('clearBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.charCount = document.getElementById('charCount');
        this.totalTasksEl = document.getElementById('totalTasks');
        this.activeTasksEl = document.getElementById('activeTasks');
        this.completedTasksEl = document.getElementById('completedTasks');
        this.completionRateEl = document.getElementById('completionRate');
        this.editModal = document.getElementById('editModal');
        this.editTaskInput = document.getElementById('editTaskInput');
        this.cancelEditBtn = document.getElementById('cancelEditBtn');
        this.saveEditBtn = document.getElementById('saveEditBtn');
        this.modalClose = document.querySelector('.modal-close');
    }

    // Setup event listeners
    setupEventListeners() {
        // Add task
        this.addBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Character count
        this.taskInput.addEventListener('input', () => this.updateCharCount());

        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => this.setFilter(btn.dataset.filter));
        });

        // Clear completed
        this.clearBtn.addEventListener('click', () => this.clearCompletedTasks());

        // Export tasks
        this.exportBtn.addEventListener('click', () => this.exportTasks());

        // Modal events
        this.cancelEditBtn.addEventListener('click', () => this.closeModal());
        this.saveEditBtn.addEventListener('click', () => this.saveEdit());
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.editModal.addEventListener('click', (e) => {
            if (e.target === this.editModal) this.closeModal();
        });

        // Priority options in modal
        document.querySelectorAll('.priority-option').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.priority-option').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            });
        });
    }

    // Add new task
    addTask() {
        const text = this.taskInput.value.trim();
        
        if (!text) {
            this.showNotification('Por favor, digite uma tarefa!', 'warning');
            return;
        }

        if (text.length > 100) {
            this.showNotification('Tarefa muito longa (máx. 100 caracteres)', 'warning');
            return;
        }

        const task = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: 'medium',
            createdAt: new Date().toLocaleDateString('pt-BR'),
            createdTime: new Date().toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })
        };

        this.tasks.unshift(task);
        this.saveTasks();
        this.taskInput.value = '';
        this.updateCharCount();
        this.render();
        this.showNotification('Tarefa adicionada com sucesso! ✓', 'success');
    }

    // Toggle task completion
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    // Delete task
    deleteTask(id) {
        if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.render();
            this.showNotification('Tarefa deletada', 'success');
        }
    }

    // Edit task
    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            this.editingTaskId = id;
            this.editTaskInput.value = task.text;
            
            // Set priority
            document.querySelectorAll('.priority-option').forEach(btn => {
                btn.classList.remove('selected');
                if (btn.dataset.priority === task.priority) {
                    btn.classList.add('selected');
                }
            });

            this.editModal.classList.add('show');
            this.editTaskInput.focus();
        }
    }

    // Save edited task
    saveEdit() {
        const newText = this.editTaskInput.value.trim();
        
        if (!newText) {
            this.showNotification('A tarefa não pode estar vazia!', 'warning');
            return;
        }

        const task = this.tasks.find(t => t.id === this.editingTaskId);
        if (task) {
            const priority = document.querySelector('.priority-option.selected').dataset.priority;
            task.text = newText;
            task.priority = priority;
            this.saveTasks();
            this.render();
            this.closeModal();
            this.showNotification('Tarefa atualizada com sucesso! ✓', 'success');
        }
    }

    // Close modal
    closeModal() {
        this.editModal.classList.remove('show');
        this.editingTaskId = null;
    }

    // Set filter
    setFilter(filter) {
        this.currentFilter = filter;
        this.filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });
        this.render();
    }

    // Get filtered tasks
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }

    // Clear completed tasks
    clearCompletedTasks() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            this.showNotification('Nenhuma tarefa concluída para limpar', 'info');
            return;
        }

        if (confirm(`Deseja deletar ${completedCount} tarefa(s) concluída(s)?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveTasks();
            this.render();
            this.showNotification('Tarefas concluídas removidas ✓', 'success');
        }
    }

    // Export tasks as JSON
    exportTasks() {
        if (this.tasks.length === 0) {
            this.showNotification('Nenhuma tarefa para exportar', 'warning');
            return;
        }

        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `tarefas-${new Date().getTime()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        this.showNotification('Tarefas exportadas com sucesso! 💾', 'success');
    }

    // Update character count
    updateCharCount() {
        const length = this.taskInput.value.length;
        this.charCount.textContent = `${length}/100 caracteres`;
    }

    // Update statistics
    updateStats() {
        const total = this.tasks.length;
        const active = this.tasks.filter(t => !t.completed).length;
        const completed = this.tasks.filter(t => t.completed).length;
        const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

        this.totalTasksEl.textContent = total;
        this.activeTasksEl.textContent = active;
        this.completedTasksEl.textContent = completed;
        this.completionRateEl.textContent = `${rate}%`;

        // Disable clear button if no completed tasks
        this.clearBtn.disabled = completed === 0;
    }

    // Save tasks to localStorage
    saveTasks() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Erro ao salvar tarefas:', error);
            this.showNotification('Erro ao salvar tarefas', 'error');
        }
    }

    // Load tasks from localStorage
    loadTasks() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.tasks = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
            this.tasks = [];
        }
    }

    // Render the UI
    render() {
        const filteredTasks = this.getFilteredTasks();

        // Clear container
        this.tasksContainer.innerHTML = '';

        if (filteredTasks.length === 0) {
            this.emptyState.style.display = 'flex';
        } else {
            this.emptyState.style.display = 'none';
            filteredTasks.forEach(task => {
                const taskEl = this.createTaskElement(task);
                this.tasksContainer.appendChild(taskEl);
            });
        }

        this.updateStats();
    }

    // Create task DOM element
    createTaskElement(task) {
        const div = document.createElement('div');
        div.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        const priorityIcons = {
            high: '🔴',
            medium: '🟡',
            low: '🟢'
        };

        div.innerHTML = `
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${task.completed ? 'checked' : ''}
                onchange="app.toggleTask(${task.id})"
            />
            <span class="priority-badge priority-${task.priority}">
                ${priorityIcons[task.priority] || '🟡'} ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <div class="task-content">
                <div class="task-text">${this.escapeHtml(task.text)}</div>
                <div class="task-date">${task.createdAt} às ${task.createdTime}</div>
            </div>
            <div class="task-actions">
                <button class="task-btn edit-btn" onclick="app.editTask(${task.id})" title="Editar">
                    ✏️
                </button>
                <button class="task-btn delete-btn" onclick="app.deleteTask(${task.id})" title="Deletar">
                    🗑️
                </button>
            </div>
        `;

        return div;
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-weight: 500;
            max-width: 300px;
            word-wrap: break-word;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Get notification color based on type
    getNotificationColor(type) {
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };
        return colors[type] || colors.info;
    }

    // Update footer date
    updateFooterDate() {
        const footerDate = document.getElementById('footerDate');
        const today = new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        footerDate.textContent = `• ${today}`;
    }

    // Add keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+S to save/export
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.exportTasks();
            }
            // Escape to close modal
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ToDoApp();
    app.setupKeyboardShortcuts();
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100px);
                opacity: 0;
            }
        }
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('✓ To-Do App Initialized');
    console.log('💡 Dicas: Use Ctrl+S para exportar, ou Delete para limpar tarefas concluídas');
});