window.onload = () => {

  function calculateTimeDeadlines(tasks) {

    var currentTime = new Date();

    for (let i = 0; i < tasks.length; i++) {
      let newTime = currentTime
      
      newTime.setMinutes(newTime.getMinutes() + Number(tasks[i].time));

      let hours = ('0' + newTime.getHours()).slice(-2);
      let minutes = ('0' + newTime.getMinutes()).slice(-2)

      tasks[i].time = hours + ":" + minutes;
    }

  }

  function printTasks(tasks) {

    let taskTable = document.getElementById("task-table");
    taskTable.border = 1;

    for (let i = 0; i < tasks.length; i++) {
      let newTableRow = document.createElement("tr");
      // task.style.backgroundColor = "green";

      let taskNumber = document.createElement("td");
      // taskName.style.backgroundColor = "yellow";
      taskNumber.textContent = (i + 1);

      let taskName = document.createElement("td");
      taskName.textContent = tasks[i].name;

      let taskTime  = document.createElement("td");
      // taskTime.style.backgroundColor = "blue";
      taskTime.textContent = tasks[i].time;

      newTableRow.appendChild(taskNumber);
      newTableRow.appendChild(taskName);
      newTableRow.appendChild(taskTime);

      taskTable.appendChild(newTableRow);
    }
  }

  function onNewListButtonClicked() {
    location = "./home.html";
  }

  function main() {
    let newListButton = document.getElementById("new-list-button");
    newListButton.addEventListener("click", onNewListButtonClicked);
    newListButton.style.marginTop = "1vw";



    if (typeof(sessionStorage.tasks) !== "undefined") {
      let tasks = JSON.parse(sessionStorage.tasks);

      calculateTimeDeadlines(tasks);
      printTasks(tasks);
    }

  }

  main();
}