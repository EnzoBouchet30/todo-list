const input = document.getElementById('textTask');
const button = document.getElementById('addTask');
const list = document.getElementById('listTask');
let tasks = [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function createTaskElement(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.classList.add('delete-button');
    li.appendChild(deleteButton);
    deleteButton.addEventListener('click', function (event) {
        event.stopPropagation();
        li.remove();
        const position = tasks.indexOf(task);
        tasks.splice(position, 1);
        saveTasks();
    })
    if (task.done) { li.classList.add('done') }
    list.appendChild(li);
    li.addEventListener('click', function () {
        li.classList.toggle('done');
        task.done = !task.done
        saveTasks()
    })

};
tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
tasks.forEach(function (task) {
    createTaskElement(task);
});
button.addEventListener('click', function () {
    const text = input.value.trim();

    if (text !== '') {
        const newTask = { text: text, done: false };
        createTaskElement(newTask);
        tasks.push(newTask);
        saveTasks();
        input.value = '';
    }
});