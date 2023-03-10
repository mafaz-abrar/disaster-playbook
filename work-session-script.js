window.onload = () => {

  function createExtendButton(taskIndex, tasks) {
    let root = document.createElement("td");

    let button = document.createElement("button");
    button.textContent = "Extend";

    button.addEventListener("click", () => {
      onExtendButtonClicked(taskIndex, tasks)
    });

    root.appendChild(button);

    return root;
  }

  // This function will read the timeEstimate property of each
  // task, and assign an expectedCompletionTime property to each task
  function calculateExpectedCompletionTimesFromTimeEstimates(tasks) {

    let currentTime = new Date();

    for (let i = 0; i < tasks.length; i++) {
      currentTime.setMinutes(currentTime.getMinutes() + Number(tasks[i].timeEstimate));
      
      // Passing by Ref - everytime currentTime changes, all tasks[i].time
      // values updated... so don't store currentTime directly
      // tasks[i].time = currentTime;

      tasks[i].expectedCompletionTime = structuredClone(currentTime);
    }
  }

  function storeFormattedTaskDeadlines(tasks) {
    for (let i = 0; i < tasks.length; i++) {
      
      let hours = ('0' + tasks[i].expectedCompletionTime.getHours()).slice(-2);

      let minutes = ('0' + tasks[i].expectedCompletionTime.getMinutes()).slice(-2);

      let seconds = ('0' + tasks[i].expectedCompletionTime.getSeconds()).slice(-2);

      tasks[i].deadline = hours + ":" + minutes + ":" + seconds;
    }
  }

  function printTasks(tasks) {

    let taskTable = document.getElementById("task-table");

    for (let i = 0; i < tasks.length; i++) {
      let newTableRow = document.createElement("tr");
      newTableRow.id = "row-" + i;
      // task.style.backgroundColor = "green";

      let taskNumber = document.createElement("td");
      // taskName.style.backgroundColor = "yellow";
      taskNumber.textContent = (i + 1);

      let taskName = document.createElement("td");
      taskName.textContent = tasks[i].name;

      let taskTime  = document.createElement("td");
      // taskTime.style.backgroundColor = "blue";
      taskTime.textContent = tasks[i].deadline;

      let taskExtendButton = createExtendButton(i, tasks);

      newTableRow.appendChild(taskNumber);
      newTableRow.appendChild(taskName);
      newTableRow.appendChild(taskTime);
      newTableRow.appendChild(taskExtendButton);

      taskTable.childNodes[1].appendChild(newTableRow);
    }
  }

  function deleteTasks() {
    let taskTable = document.getElementById("task-table");

    let children = taskTable.childNodes[1].childNodes;

    let i = 1;

    while (children.length > 1) {
      if (typeof(children[i]) !== 'undefined') {
        children[i].remove();
      }
    }
  }

  function highlightCurrentTask(tasks) {
    let currentTime = new Date();

    for (let i = 0; i < tasks.length; i++) {

      let row = document.getElementById("row-" + i);

      if (typeof(tasks[i - 1]) === 'undefined') {
        if (currentTime < tasks[i].expectedCompletionTime) {
          row.style.backgroundColor = "yellow";
        }
        else {
          row.style.backgroundColor = "white";
        }
      }
      else {
        if (currentTime < tasks[i].expectedCompletionTime && currentTime >= tasks[i - 1].expectedCompletionTime) {
          row.style.backgroundColor = "yellow";
        }
        else {
          row.style.backgroundColor = "white";
        }
      }
    }
  }

  function onExtendButtonClicked(taskIndex, tasks) {

    while (typeof(tasks[taskIndex]) !== 'undefined') {
      let newTime = tasks[taskIndex].expectedCompletionTime;

      newTime.setMinutes(newTime.getMinutes() + 5);

      taskIndex++;
    }
    
    deleteTasks();
    storeFormattedTaskDeadlines(tasks);
    printTasks(tasks);
  }

  function onNewListButtonClicked() {
    sessionStorage.clear();
    location = "./home.html";
  }

  function main() {
    let newListButton = document.getElementById("new-list-button");
    newListButton.addEventListener("click", onNewListButtonClicked);


    if (typeof(sessionStorage.tasks) !== "undefined") {
      let tasks = JSON.parse(sessionStorage.tasks);

      calculateExpectedCompletionTimesFromTimeEstimates(tasks);
      storeFormattedTaskDeadlines(tasks);
      printTasks(tasks);

      setInterval(() => {
        highlightCurrentTask(tasks);
      }, 1000);
    }
  }

  main();
}