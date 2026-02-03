const btnAdd = document.getElementById('btn-add');
const inp = document.getElementById('inp');
const taskList = document.querySelector('.task-list');

// Display Task in the list
const displayData = () => {
  const getTask = JSON.parse(localStorage.getItem("toDoTask")) ?? [];
  let html = "";

  getTask.map(item =>{
    html += `<li>
              <p>${item.data}</p>
              <div class="btns">
                  <i onClick="updateItem(${item.id}, '${item.data}')" class="fa-solid fa-pen-to-square"></i>
                  <i onClick="deleteItem(${item.id})" class="fa-solid fa-trash"></i>
              </div>
            </li>`
  })

  taskList.innerHTML = html;
}

displayData();

// Update Item in the List
const updateItem = (id, task)=> {
  const editTask = prompt("Edit Your Task", task);
  const getTask = JSON.parse(localStorage.getItem("toDoTask")) ?? [];

  getTask.map(item => {
    if(item.id === id) {
      item.data = editTask;
    }
  })

  localStorage.setItem("toDoTask", JSON.stringify(getTask));
  displayData();
}

//Delete task in the list
const deleteItem = (id) => {
  const getTask = JSON.parse(localStorage.getItem("toDoTask")) ?? [];
  let newData = getTask.filter(item => item.id != id);
  localStorage.setItem("toDoTask", JSON.stringify(newData));
  displayData();
}

// Saving task to local Storage
const saveTask = (task) => {
  const getTask = JSON.parse(localStorage.getItem("toDoTask")) ?? [];

  getTask.push({
    id: Date.now(),
    data: task
  })

  localStorage.setItem("toDoTask", JSON.stringify(getTask));
  inp.value = "";
  displayData()
}




// Button function for adding task
btnAdd.addEventListener("click", () => {
  let inpValue = inp.value.trim();

  if(!inpValue) {
    return alert("Input is Empty!")
  }

  saveTask(inpValue);

})