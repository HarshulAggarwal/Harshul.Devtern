const taskInput = document.getElementById('taskInput');
const dueDate = document.getElementById('dueDate');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value;
    const dateValue = dueDate.value;
    if (taskText) {
        const li = document.createElement('li');
        li.innerHTML = `${taskText} <span>${dateValue}</span> <button class="remove">Remove</button>`;
        taskList.appendChild(li);
        taskInput.value = '';
        dueDate.value = '';
        checkDates();
    }
});

taskList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
    } else if (e.target.classList.contains('remove')) {
        e.target.parentElement.remove();
    }
});

const checkDates = () => {
    const today = new Date();
    taskList.querySelectorAll('li').forEach(li => {
        const dateText = li.querySelector('span').innerText;
        const dueDate = new Date(dateText);
        li.classList.remove('overdue', 'due-soon');
        
        if (dueDate < today) {
            li.classList.add('overdue');
        } else if (dueDate <= today.setDate(today.getDate() + 3)) {
            li.classList.add('due-soon');
        }
    });
};

// Run checkDates initially and then every second
setInterval(checkDates, 1000);
