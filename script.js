window.onload = () => {
  var numTasks = 0;
  var addTaskButton = document.getElementById("add-task-btn")

  function renumberTasks() {
    var taskList =  document.getElementById("task-list");

    var children = taskList.childNodes;

    for (let i = 1; i < children.length; i++) {
      let item = children.item(i)
      
      let text = item.childNodes[0];
      
      text.nodeValue = "Task " + i + ": ";
    }
  }


  function createDeleteButton(taskIndex) {
    var deleteTaskButton = document.createElement("button");
    deleteTaskButton.textContent  = "Delete";
    deleteTaskButton.id = "delete-btn-" + taskIndex;

    deleteTaskButton.addEventListener("click", () => {
      var element = document.getElementById("task-" + taskIndex)
      element.remove();

      renumberTasks();

      numTasks--;
    })

    return deleteTaskButton;
  }

  function createTimeEstimateInput() {
    var input = document.createElement("input");
    input.type = "text";
    input.name = "time";

    var label = document.createElement("p");
    label.textContent = "Estimated Time: ";

    label.appendChild(input);
    
    return label;
  }

  function createTaskInput(numTasks) {
    var taskList = document.getElementById("task-list");

    var label = document.createElement("p");
    label.id = "task-" + (numTasks)

    label.textContent  = "Task " + (numTasks + 1)  + ": ";

    var input = document.createElement("input");
    input.type = "text";
    input.name = "task";

    var innerDiv = document.createElement("div");

    innerDiv.appendChild(input);

    var deleteButton = createDeleteButton(numTasks);
    innerDiv.appendChild(deleteButton);

    label.appendChild(innerDiv);

    taskList.appendChild(label);
  }

  function addTask() {
    createTaskInput(numTasks);
    numTasks++;
  };

  // Registering event listeners
  
  addTaskButton.addEventListener("click", addTask);
}


