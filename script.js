window.onload = () => {
  let numTasks = 0;
  let addTaskButton = document.getElementById("add-task-btn")

  function renumberTasks() {
    let taskList =  document.getElementById("task-list");

    let children = taskList.childNodes;

    for (let i = 1; i < children.length; i++) {
      let item = children.item(i)
      
      let text = item.childNodes[0];
      
      text.nodeValue = "Task " + i + ": ";
    }
  }


  function createDeleteButton(taskIndex) {
    let deleteTaskButton = document.createElement("button");
    deleteTaskButton.textContent  = "Delete";
    deleteTaskButton.id = "delete-btn-" + taskIndex;

    deleteTaskButton.addEventListener("click", () => {
      let element = document.getElementById("task-" + taskIndex)
      element.remove();

      renumberTasks();

      numTasks--;
    })

    return deleteTaskButton;
  }

  function createTimeEstimateInput() {
    let input = document.createElement("input");
    input.type = "text";
    input.name = "time";

    let label = document.createElement("p");
    label.textContent = "Estimated Time: ";

    label.appendChild(input);
    
    return label;
  }

  // Create a Task Input field with lab
  function createTaskInput(numTasks) {
    let taskList = document.getElementById("task-list");

    let label = document.createElement("p");
    label.id = "task-" + (numTasks)

    label.textContent  = "Task " + (numTasks + 1)  + ": ";

    let input = document.createElement("input");
    input.type = "text";
    input.name = "task";

    let innerDiv = document.createElement("div");

    innerDiv.appendChild(input);

    let deleteButton = createDeleteButton(numTasks);
    innerDiv.appendChild(deleteButton);

    label.appendChild(innerDiv);

    taskList.appendChild(label);
  }

  // Create a Task Node
  function createTask(taskNumber) {
    let task = document.createElement("li");
    task.id = "task-" + (taskNumber);

    let taskName = createTaskName();
    task.appendChild(taskName);

    let taskTimeEstimate = createTaskTimeEstimate();
    task.appendChild(taskTimeEstimate);

    let taskDeleteButton = createTaskDeleteButton();
    task.appendChild(taskDeleteButton);

    return task;
  }

  // Add a Task
  function addTask() {
    let task


    createTaskInput(numTasks);
    numTasks++;
  };

  // Main function
  function main() {
    // Registering event listeners
    addTaskButton.addEventListener("click", addTask);
  }
  
  main();
}


