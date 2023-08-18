interface Task {
    id: number;
    content: string;
    completed: boolean;
    timestamp:Date;
  }
  
  const taskInput = document.getElementById('taskInput') as HTMLInputElement;
  const addTaskButton = document.getElementById('addTaskBtn') as HTMLButtonElement;
  const taskList = document.getElementById('taskList') as HTMLUListElement;
  const emptyTaskMsg = document.getElementById('emptyTaskMsg') as HTMLParagraphElement;
  
  const tasks: Task[] = [];
  
  function updateTaskListUI() {
    taskList.innerHTML = '';
    emptyTaskMsg.classList.toggle('hidden', tasks.length > 0);
    const now = new Date()
  
    tasks.forEach(task => {
        const timeDifferenceInSeconds = Math.floor((now.getTime() - task.timestamp.getTime()) / 1000);
        const li = document.createElement('li');
        li.className = 'flex items-center';
        li.innerHTML = `
          <input type="checkbox" p-2 class="mr-2 form-checkbox text-blue-500" ${task.completed ? 'checked' : ''}>
          <span class="flex-1 p-2 ${task.completed ? 'line-through text-gray-500' : ''}">${task.content}</span>
          <button class="mr-2 p-2 text-white p-1 rounded hover:bg-green-600 focus:outline-none complete-btn" style="background-color: ${task.completed ? '#FFA500' : '#48BB78'}">${task.completed ? 'Pending' : 'Complete'}</button>
          <button class=" mr-2 bg-red-500 text-white p-1 rounded hover:bg-red-600 focus:outline-none delete-btn">Delete</button>
          <button class="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 focus:outline-none edit-btn">Edit</button>
          <span class=" mr-2 ml-2 text-gray-500 time-indicator ${timeDifferenceInSeconds > 0 ? '' : ''}">${formatTime(timeDifferenceInSeconds)}</span>
        `;
        
        // Apply consistent padding to all buttons
        const buttons = li.querySelectorAll('button');
        buttons.forEach(button => {
          button.classList.add('p-2');
        });
  
      taskList.appendChild(li);
  
      const completeBtn = li.querySelector('.complete-btn') as HTMLButtonElement;
      const deleteBtn = li.querySelector('.delete-btn') as HTMLButtonElement;
      const editBtn = li.querySelector('.edit-btn') as HTMLButtonElement;
      const timeIndicator = li.querySelector('.time-indicator') as HTMLSpanElement;

      completeBtn.addEventListener('click', () => {
        const taskIndex = tasks.findIndex(task => task.id === task.id); // Replace 'task.id' with the actual task's ID
        if (taskIndex !== -1) {
          tasks[taskIndex].completed = !tasks[taskIndex].completed;
          updateTaskListUI();
        }
      });
      
      
      
      deleteBtn.addEventListener('click', () => {
        // Find the task associated with this button
        const taskIndex = tasks.findIndex(task => task.id === task.id); // Replace 'task.id' with the actual task's ID
        if (taskIndex !== -1) {
          tasks.splice(taskIndex, 1);
          updateTaskListUI();
        }
      });
      
      editBtn.addEventListener('click', () => {
        // Find the task associated with this button
        const taskIndex = tasks.findIndex(task => task.id === task.id); // Replace 'task.id' with the actual task's ID
        if (taskIndex !== -1) {
          const newContent = prompt('Edit task:', tasks[taskIndex].content);
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
  
  addTaskButton.addEventListener('click', () => {
    const taskContent = taskInput.value.trim();
    if (taskContent !== '') {
      const newTask: Task = {
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

  function formatTime(seconds: number): string {
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
  }
  