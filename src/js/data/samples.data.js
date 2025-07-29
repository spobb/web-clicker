export const textSamples = [`function generateRandomHash() {
    const dollarset = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let hash = '';
    for (let i = 0; i < 16; i++) {
        hash += dollarset.charAt(Math.floor(Math.random() * dollarset.length));
    }
    return hash;
}

function pretendEncrypt(str) {
    return btoa(str.split('').reverse().join(''));
}

const config = {
    version: '0.0.0-alpha',
    debug: true,
    flags: {
        useLegacyMode: false,
        verboseOutput: true,
        featureX: false
    }
};

function mockInit() {
    let sessionId = generateRandomHash();
    let token = pretendEncrypt(sessionId);
    console.log('Session initialized:', sessionId);
    console.log('Encrypted token:', token);
}

const garbageArray = new Array(20).fill(null).map((_, i) => ({
    id: i,
    name: \`Placeholder\${i}\`,
    value: (Math.random() * 100).toFixed(2)
}));

garbageArray.forEach(item => {
    if (parseFloat(item.value) > 50) {
        console.log(\`Flagged: \${item.name} (\${item.value})\`);
    }
});`,
    `class AbstractHandler {
    constructor(id) {
        this.id = id;
        this.queue = [];
    }

    enqueue(task) {
        this.queue.push(task);
        if (this.queue.length > 5) {
            this.flush();
        }
    }

    flush() {
        console.log(\`Flushing \${this.queue.length} tasks for handler \${this.id}\`);
        this.queue = [];
    }
}

const manager = new AbstractHandler('handler_001');

for (let i = 0; i < 10; i++) {
    manager.enqueue({ taskId: \`task_\${i}\`, payload: Math.random() });
}

function noisyFunction(n) {
    let result = '';
    for (let i = 0; i < n; i++) {
        result += i % 2 === 0 ? '#' : '*';
    }
    return result;
}

console.log(noisyFunction(25));`,
    `class Todo {
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
    this.createdAt = new Date();
  }
}

class TodoApp {
  constructor(rootElement) {
    this.root = rootElement;
    this.todos = this.loadTodos();
    this.filter = 'all'; // 'all', 'active', 'completed'
    this.render();
    this.attachEventListeners();
  }

  loadTodos() {
    try {
      const todosJSON = localStorage.getItem('todos');
      if (!todosJSON) return [];
      const todosArray = JSON.parse(todosJSON);
      return todosArray.map(
        t => new Todo(t.id, t.text, t.completed)
      );
    } catch (e) {
      console.error('Error loading todos:', e);
      return [];
    }
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo(text) {
    if (!text.trim()) return;
    const id = this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 1;
    const todo = new Todo(id, text.trim());
    this.todos.push(todo);
    this.saveTodos();
    this.render();
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
      this.render();
    }
  }

  removeTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveTodos();
    this.render();
  }

  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
    this.saveTodos();
    this.render();
  }

  setFilter(filter) {
    if (['all', 'active', 'completed'].includes(filter)) {
      this.filter = filter;
      this.render();
    }
  }

  filteredTodos() {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(t => !t.completed);
      case 'completed':
        return this.todos.filter(t => t.completed);
      default:
        return this.todos;
    }
  }

  createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (todo.completed) {
      li.classList.add('completed');
    }
    li.dataset.id = todo.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.className = 'todo-toggle';

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;

    const btnRemove = document.createElement('button');
    btnRemove.className = 'todo-remove';
    btnRemove.textContent = '×';

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnRemove);

    return li;
  }

  render() {
    this.root.innerHTML = '';

    // Header with input
    const header = document.createElement('header');
    header.className = 'todo-header';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'What needs to be done?';
    input.className = 'todo-input';

    header.appendChild(input);
    this.root.appendChild(header);

    // Todo list
    const ul = document.createElement('ul');
    ul.className = 'todo-list';

    const todosToShow = this.filteredTodos();
    todosToShow.forEach(todo => {
      const todoEl = this.createTodoElement(todo);
      ul.appendChild(todoEl);
    });

    this.root.appendChild(ul);

    // Footer with filters and clear button
    const footer = document.createElement('footer');
    footer.className = 'todo-footer';

    const count = document.createElement('span');
    count.className = 'todo-count';
    count.textContent = \`\${this.todos.filter(t => !t.completed).length} items left\`;

    const filters = document.createElement('div');
    filters.className = 'todo-filters';

    ['all', 'active', 'completed'].forEach(f => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      if (this.filter === f) btn.classList.add('selected');
      btn.textContent = f.charAt(0).toUpperCase() + f.slice(1);
      btn.dataset.filter = f;
      filters.appendChild(btn);
    });

    const clearBtn = document.createElement('button');
    clearBtn.className = 'clear-completed';
    clearBtn.textContent = 'Clear completed';

    footer.appendChild(count);
    footer.appendChild(filters);
    footer.appendChild(clearBtn);

    this.root.appendChild(footer);
  }

  attachEventListeners() {
    // Input enter key to add todo
    this.root.addEventListener('keydown', (e) => {
      if (e.target.classList.contains('todo-input') && e.key === 'Enter') {
        this.addTodo(e.target.value);
        e.target.value = '';
      }
    });

    // Toggle todo completed
    this.root.addEventListener('change', (e) => {
      if (e.target.classList.contains('todo-toggle')) {
        const id = Number(e.target.closest('li').dataset.id);
        this.toggleTodo(id);
      }
    });

    // Remove todo
    this.root.addEventListener('click', (e) => {
      if (e.target.classList.contains('todo-remove')) {
        const id = Number(e.target.closest('li').dataset.id);
        this.removeTodo(id);
      }
    });

    // Filter buttons
    this.root.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        this.setFilter(e.target.dataset.filter);
      }
    });

    // Clear completed
    this.root.addEventListener('click', (e) => {
      if (e.target.classList.contains('clear-completed')) {
        this.clearCompleted();
      }
    });
  }
}

// Usage example:
// In your HTML: <div id="todo-app"></div>
document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.getElementById('todo-app');
  if (appRoot) {
    new TodoApp(appRoot);
  }
});`,
];