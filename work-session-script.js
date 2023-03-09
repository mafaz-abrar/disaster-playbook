window.onload = () => {

  function calculateTimeDeadlines(tasks) {

    let currentTime = new Date();

    for (let i = 0; i < tasks.length; i++) {
      let newTime = new Date()
      
      newTime.setMinutes(currentTime.getMinutes() + Number(tasks[i].time));

      tasks[i].time = newTime;

      let hours = ('0' + newTime.getHours()).slice(-2);
      let minutes = ('0' + newTime.getMinutes()).slice(-2);
      let seconds = ('0' + newTime.getSeconds()).slice(-2);

      tasks[i].deadline = hours + ":" + minutes + ":" + seconds;
    }
  }

  function printTasks(tasks) {

    let taskTable = document.getElementById("task-table");
    taskTable.border = 1;

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

      newTableRow.appendChild(taskNumber);
      newTableRow.appendChild(taskName);
      newTableRow.appendChild(taskTime);

      taskTable.appendChild(newTableRow);
    }
  }

  function highlightCurrentTask(tasks) {
    let currentTime = new Date();

    for (let i = 0; i < tasks.length; i++) {

      let row = document.getElementById("row-" + i);

      if (typeof(tasks[i - 1]) === 'undefined') {
        if (currentTime < tasks[i].time) {
          row.style.backgroundColor = "yellow";
        }
        else {
          console.log("NOT");
          row.style.backgroundColor = "white";
        }
      }
      else {
        if (currentTime < tasks[i].time && currentTime >= tasks[i - 1].time) {
          row.style.backgroundColor = "yellow";
        }
        else {
          row.style.backgroundColor = "white";
        }
      }
    }
  }

  function onNewListButtonClicked() {
    location = "./home.html";
  }

  function main() {
    let newListButton = document.getElementById("new-list-button");
    newListButton.addEventListener("click", onNewListButtonClicked);


    if (typeof(sessionStorage.tasks) !== "undefined") {
      let tasks = JSON.parse(sessionStorage.tasks);

      calculateTimeDeadlines(tasks);
      printTasks(tasks);

      setInterval(() => {
        highlightCurrentTask(tasks);
      }, 1000);
    }
  }

  main();
}