window.onload = () => {
  let totalNumberOfTasks = 0;

  function retrieveTasks(tasks) {
    for (let i = 0; i < tasks.length; i++) {
      

    }
  }


  function renumberTasks() {
    let taskList =  document.getElementById("task-list");

    let children = taskList.childNodes;

    for (let i = 1; i < children.length; i++) {
      let task = children.item(i)
      
      let taskNameRootDiv = task.childNodes[0];
      let taskNameInputSpan = taskNameRootDiv.childNodes[0];
      
      taskNameInputSpan.textContent = "Task " + i + ":";
    }
  }


  function createTaskDeleteButton(taskIndex) {
    let root = document.createElement("div");
    root.style.width = "15%";
    // root.style.backgroundColor = "red";
    root.style.display = "inline-flex";
    root.style.justifyContent = "center";

    let deleteTaskButton = document.createElement("button");
    deleteTaskButton.textContent  = "Delete";
    deleteTaskButton.id = "delete-btn-" + taskIndex;
    deleteTaskButton.addEventListener("click", () => {
      onDeleteButtonClicked(taskIndex);
    });
    deleteTaskButton.tabIndex = -1;

    root.appendChild(deleteTaskButton);

    return root;
  }

  function createTimeEstimateInput(taskIndex) {
    let root = document.createElement("div");
    root.style.width = "35%";
    // root.style.backgroundColor = "green";
    root.style.display = "inline-flex";
    root.style.justifyContent = "space-between";
    root.style.padding = "0.5vw";

    let label = document.createElement("span");
    label.textContent = "Estimated time in min(s): ";

    let input = document.createElement("input");
    input.type = "text";
    input.name = "time";
    input.style.width = "20%";

    root.appendChild(label);
    root.appendChild(input);
    
    return root;
  }

  // Create a Task Input field with lab
  function createTaskNameInput(taskIndex) {
    let root = document.createElement("div");
    root.style.width = "50%";
    // root.style.backgroundColor = "yellow";
    root.style.display = "inline-flex";
    root.style.justifyContent = "space-between";
    root.style.padding = "0.5vw";

    let label = document.createElement("span");
    label.textContent  = "Task " + taskIndex + ": ";

    let input = document.createElement("input");
    input.type = "text";
    input.name = "task";
    input.style.width = "80%";

    root.appendChild(label);
    root.appendChild(input);

    return root;
  }

  // Create a Task Node
  function createTask(taskIndex) {
    let task = document.createElement("li");
    task.id = "task-" + (taskIndex);
    task.style.paddingTop = "2vh";
    task.style.paddingBottom = "2vh";
    // task.style.backgroundColor = "blue";

    let taskName = createTaskNameInput(taskIndex);
    task.appendChild(taskName);

    let taskTimeEstimate = createTimeEstimateInput(taskIndex);
    task.appendChild(taskTimeEstimate);

    let taskDeleteButton = createTaskDeleteButton(taskIndex);
    task.appendChild(taskDeleteButton);

    return task;
  }

  // Add a Task to a List
  function addTask(task, taskList) {
    sessionStorage


    taskList.appendChild(task);
  };

  // Handle the add task button click
  function onAddTaskButtonClicked() {
    let task = createTask(totalNumberOfTasks + 1);

    let taskList = document.getElementById("task-list");

    addTask(task, taskList);

    totalNumberOfTasks++;
  }

  // Handle the delete button click
  function onDeleteButtonClicked(taskIndex) {
    let elementToDelete = document.getElementById("task-" + taskIndex)
    elementToDelete.remove();

    renumberTasks();

    totalNumberOfTasks--;
  }

  function onStartButtonClicked() {
    // validatInputs();

    let tasks = [];

    let taskList = document.getElementById("task-list");

    let children = taskList.childNodes;

    for (let i = 1; i < children.length; i++) {
      let task = children.item(i);
      
      let taskNameRootDiv = task.childNodes[0];
      let taskNameInput = taskNameRootDiv.childNodes[1];
      let taskNameValue = taskNameInput.value;

      let taskTimeEstimateRootDiv = task.childNodes[1];
      let taskTimeEstimateInput = taskTimeEstimateRootDiv.childNodes[1];
      let taskTimeEstimateValue = taskTimeEstimateInput.value;

      task = {
        name: taskNameValue,
        time: taskTimeEstimateValue,
      };

      tasks.push(task);
    }

    sessionStorage.tasks = JSON.stringify(tasks)

    location = "./work-session.html";
  }

  // Main function
  function main() {

    if (typeof sessionStorage !== 'undefined') {

    }

    // Registering event listeners
    let addTaskButton = document.getElementById("add-task-button");
    addTaskButton.addEventListener("click", onAddTaskButtonClicked);

    let startButton = document.getElementById("start-button");
    startButton.addEventListener("click", onStartButtonClicked)
  }
  
  main();
}


