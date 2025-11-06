 
    class TaskManager {
      constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.list = document.getElementById('list');
        this.filterSelect = document.getElementById('filterSelect');
        this.sortSelect = document.getElementById('sortSelect');
        this.render();
      }

      save() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }

      addTask(text) {
        const task = {
          id: Date.now(),
          text,
          done: false,
          createdAt: new Date().toLocaleString()
        };
        this.tasks.push(task);
        this.save();
        this.render();
      }

      deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.save();
        this.render();
      }

      toggleDone(id) {
        const task = this.tasks.find(t => t.id === id);
        task.done = !task.done;
        this.save();
        this.render();
      }

      editTask(id, newText) {
        const task = this.tasks.find(t => t.id === id);
        task.text = newText;
        this.save();
        this.render();
      }

      getFilteredTasks() {
        let filtered = [...this.tasks];
        const filter = this.filterSelect.value;
        if (filter === 'completed') filtered = filtered.filter(t => t.done);
        else if (filter === 'pending') filtered = filtered.filter(t => !t.done);

        const sort = this.sortSelect.value;
        if (sort === 'alpha') filtered.sort((a, b) => a.text.localeCompare(b.text));
        else if (sort === 'time') filtered.sort((a, b) => b.id - a.id);

        return filtered;
      }

      render() {
        this.list.innerHTML = '';
        const filteredTasks = this.getFilteredTasks();
        filteredTasks.forEach(task => {
          const li = document.createElement('li');
          if (task.done) li.classList.add('done');

          const left = document.createElement('div');
          const span = document.createElement('span');
          span.textContent = task.text;
          const time = document.createElement('span');
          time.className = 'timestamp';
          time.textContent = task.createdAt;
          left.append(span, time);

          const icons = document.createElement('div');
          icons.className = 'icons';

          const checkBtn = document.createElement('button');
          checkBtn.innerHTML = '✔️';
          checkBtn.title = 'Mark Done';
          checkBtn.onclick = () => this.toggleDone(task.id);

          const editBtn = document.createElement('button');
          editBtn.innerHTML = '✏️';
          editBtn.title = 'Edit';
          editBtn.onclick = () => {
            const newText = prompt('Edit task:', task.text);
            if (newText !== null && newText.trim() !== '') this.editTask(task.id, newText.trim());
          };

          const delBtn = document.createElement('button');
          delBtn.innerHTML = '❌';
          delBtn.title = 'Delete';
          delBtn.onclick = () => this.deleteTask(task.id);

          icons.append(checkBtn, editBtn, delBtn);
          li.append(left, icons);
          this.list.append(li);
        });
      }
    }

    // Initialize app
    const manager = new TaskManager();
    const input = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const filterSelect = document.getElementById('filterSelect');
    const sortSelect = document.getElementById('sortSelect');

    addBtn.onclick = () => {
      const text = input.value.trim();
      if (!text) return;
      manager.addTask(text);
      input.value = '';
      input.focus();
    };

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') addBtn.click();
    });

    filterSelect.onchange = () => manager.render();
    sortSelect.onchange = () => manager.render();
  