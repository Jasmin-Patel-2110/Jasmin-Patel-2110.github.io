// select needed elements
const addClassBtn = document.querySelector(".add-task-btn");
let taskList = document.querySelectorAll(".board-item");
let boards = document.querySelectorAll(".board");

let draggedElement = null;
let dropBoard = null;

// add task button
addClassBtn.addEventListener("click", (e) => {
  if (boards.length === 0) {
    alert("no board available to add task.");
    return;
  }
  const taskText = prompt("Enter the task.");

  if (!taskText) {
    return;
  }

  boards[0].querySelector(".task-list").append(createTaskElement(taskText));

  updateLists(); // update different lists
  updateTaskCount(); // update task counter of every board.
});

// create task, add events to it and return task
function createTaskElement(taskText) {
  const task = document.createElement("p");
  task.className = "board-item";
  task.setAttribute("draggable", "true");
  task.innerHTML = `<span class="task-text">${taskText}</span>
            <div class="task-util">
              <span class="edit-task fa-solid fa-pen-to-square"> </span>
              <span class="delete-task fa-solid fa-trash"> </span>
            </div>`;

  addDragEvents(task);
  addEditEvent(task.querySelector(".edit-task"));
  addDeleteEvent(task.querySelector(".delete-task"));

  return task;
}

// applying drag events to every task.
taskList.forEach((task, key) => {
  addDragEvents(task);
});

// applying drop events to every board's drop area.
boards.forEach((board, key) => {
  addDropEvent(board.querySelector(".task-list"));
});

// Adds a dragstart and dragend events to task
function addDragEvents(task) {
  task.addEventListener("dragstart", (e) => {
    draggedElement = e.target;
    draggedElement.classList.add("dragging");
    // draggedElement.style.cursor = "grabbing";
  });

  task.addEventListener("dragend", (e) => {
    try {
      draggedElement.classList.remove("dragging");
      // draggedElement.style.cursor = "grab";
      dropBoard.appendChild(draggedElement);

      updateLists();
      updateTaskCount();
    } catch (e) {
      console.log(e);
    } finally {
      draggedElement = null;
      dropBoard = null;
    }
  });
}

// Adds a dragover event listener to select the drop board
function addDropEvent(board) {
  board.addEventListener("dragover", (e) => {
    if (e.target.classList.contains("task-list")) {
      dropBoard = e.target;
    }
  });
}

// select add board button
const addBoardBtn = document.querySelector(".add-board-btn");

// add new board
addBoardBtn.addEventListener("click", (e) => {
  const boardName = prompt("Enter board name.");

  if (!boardName) return;

  const newBoard = document.createElement("div");
  newBoard.classList.add("board");
  newBoard.innerHTML = `<div class="board-header">
          <h4>${boardName}</h4>
          <div class="board-header-util">
            <span class="board-task-count">00</span>
            <span class="fa-solid fa-pen-to-square"></span>
            <span class="fa-solid fa-trash"></span>
          </div>
        </div>
        <div class="task-list">
        </div>`;

  addDropEvent(newBoard.querySelector(".task-list"));
  addBoardEditEvent(newBoard.querySelector(".fa-pen-to-square"));
  addBoardDeleteEvent(newBoard.querySelector(".fa-trash"));

  document.querySelector(".container").append(newBoard);

  updateLists(); // update different lists
});

// edit task
let editTaskBtn = document.querySelectorAll(".edit-task");
editTaskBtn.forEach(addEditEvent);

// delete task
let deleteTaskBtnList = document.querySelectorAll(".delete-task");
deleteTaskBtnList.forEach(addDeleteEvent);

// Adds a click event listener to a button to edit task.
function addEditEvent(btn) {
  btn.addEventListener("click", function (e) {
    const taskText = prompt("Enter the task.");

    if (!taskText) return;

    this.parentElement.parentElement.children[0].innerHTML = taskText;
  });
}

// Adds a click event listener to a button to delete task.
function addDeleteEvent(btn) {
  btn.addEventListener("click", function (e) {
    this.parentElement.parentElement.remove(); // select and remove task.

    updateLists();
    updateTaskCount();
  });
}

// selecting board edit and delete buttons
let boardDeleteBtn = document.querySelectorAll(
  ".board-header-util > .fa-trash"
);
let boardEditBtn = document.querySelectorAll(
  ".board-header-util > .fa-pen-to-square"
);

// Add delete board event to every board delete button.
boardDeleteBtn.forEach(addBoardDeleteEvent);

function addBoardDeleteEvent(btn) {
  btn.addEventListener("click", function (e) {
    this.parentElement.parentElement.parentElement.remove();

    updateLists();
  });
}

// Add edit board event to every board edit button.
boardEditBtn.forEach(addBoardEditEvent);

function addBoardEditEvent(btn) {
  btn.addEventListener("click", function (e) {
    let newBoardName = prompt("Enter new board name.");
    this.parentElement.parentElement.children[0].innerHTML = newBoardName;
  });
}

// update board task count
let boardTaskCount = document.querySelectorAll(".board-task-count");
updateTaskCount();

// updating task count of every board.
function updateTaskCount() {
  boardTaskCount.forEach((counter, key) => {
    counter.innerHTML = String(
      boards[key].querySelectorAll(".board-item").length
    ).padStart(2, "0");
  });
}

// updating different lists
function updateLists() {
  boards = document.querySelectorAll(".board"); // updating boards list

  boardDeleteBtn = document.querySelectorAll(".board-header-util > .fa-trash"); // updating boardDeleteBtn list
  boardEditBtn = document.querySelectorAll(
    ".board-header-util > .fa-pen-to-square"
  ); // updating boardEditBtn list

  editTaskBtn = document.querySelectorAll(".edit-task"); // updating editTaskBtn list
  deleteTaskBtnList = document.querySelectorAll(".delete-task"); // updating deleteTaskBtnList list

  boardTaskCount = document.querySelectorAll(".board-task-count"); // updating task counter's list.
}
