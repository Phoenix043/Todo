var taskInput = document.getElementById('taskInput');
var addTaskButton = document.getElementById('addTaskBtn');
var taskList = document.getElementById('taskList');
var emptyTaskMsg = document.getElementById('emptyTaskMsg');
var tasks = [];
function updateTaskListUI() {
    taskList.innerHTML = '';
    emptyTaskMsg.classList.toggle('hidden', tasks.length > 0);
    var now = new Date();
    tasks.forEach(function (task) {
        var timeDifferenceInSeconds = Math.floor((now.getTime() - task.timestamp.getTime()) / 1000);
        var li = document.createElement('li');
        li.className = 'flex items-center';
        li.innerHTML = "\n          <input type=\"checkbox\" p-2 class=\"mr-2 form-checkbox text-blue-500\" ".concat(task.completed ? 'checked' : '', ">\n          <span class=\"flex-1 p-2 ").concat(task.completed ? 'line-through text-gray-500' : '', "\">").concat(task.content, "</span>\n          <button class=\"mr-2 p-2 text-white p-1 rounded hover:bg-green-600 focus:outline-none complete-btn\" style=\"background-color: ").concat(task.completed ? '#FFA500' : '#48BB78', "\">").concat(task.completed ? 'Pending' : 'Complete', "</button>\n          <button class=\" mr-2 bg-red-500 text-white p-1 rounded hover:bg-red-600 focus:outline-none delete-btn\">Delete</button>\n          <button class=\"bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 focus:outline-none edit-btn\">Edit</button>\n          <span class=\" mr-2 ml-2 text-gray-500 time-indicator ").concat(timeDifferenceInSeconds > 0 ? '' : '', "\">").concat(formatTime(timeDifferenceInSeconds), "</span>\n        ");
        // Apply consistent padding to all buttons
        var buttons = li.querySelectorAll('button');
        buttons.forEach(function (button) {
            button.classList.add('p-2');
        });
        taskList.appendChild(li);
        var completeBtn = li.querySelector('.complete-btn');
        var deleteBtn = li.querySelector('.delete-btn');
        var editBtn = li.querySelector('.edit-btn');
        var timeIndicator = li.querySelector('.time-indicator');
        completeBtn.addEventListener('click', function () {
            var taskIndex = tasks.findIndex(function (task) { return task.id === task.id; }); // Replace 'task.id' with the actual task's ID
            if (taskIndex !== -1) {
                tasks[taskIndex].completed = !tasks[taskIndex].completed;
                updateTaskListUI();
            }
        });
        deleteBtn.addEventListener('click', function () {
            // Find the task associated with this button
            var taskIndex = tasks.findIndex(function (task) { return task.id === task.id; }); // Replace 'task.id' with the actual task's ID
            if (taskIndex !== -1) {
                tasks.splice(taskIndex, 1);
                updateTaskListUI();
            }
        });
        editBtn.addEventListener('click', function () {
            // Find the task associated with this button
            var taskIndex = tasks.findIndex(function (task) { return task.id === task.id; }); // Replace 'task.id' with the actual task's ID
            if (taskIndex !== -1) {
                var newContent = prompt('Edit task:', tasks[taskIndex].content);
                if (newContent !== null) {
                    tasks[taskIndex].content = newContent;
                    updateTaskListUI();
                }
            }
        });
        // Set time indicator (example: setTimeout(() => { timeIndicator.classList.toggle('hidden', true); }, 5000); )
        // Set time indicator (example: setTimeout(() => { timeIndicator.classList.toggle('hidden', true); }, 5000); )
    });
}
addTaskButton.addEventListener('click', function () {
    var taskContent = taskInput.value.trim();
    if (taskContent !== '') {
        var newTask = {
            id: tasks.length + 1,
            content: taskContent,
            completed: false,
            timestamp: new Date()
        };
        tasks.push(newTask);
        updateTaskListUI();
        taskInput.value = '';
    }
});
updateTaskListUI();
function formatTime(seconds) {
    if (seconds < 60) {
        return "".concat(seconds, " seconds ago");
    }
    else {
        var minutes = Math.floor(seconds / 60);
        return "".concat(minutes, " ").concat(minutes === 1 ? 'minute' : 'minutes', " ago");
    }
}
