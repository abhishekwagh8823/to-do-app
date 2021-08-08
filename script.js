//getting all required element
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
  let userData = inputBox.value; //getting value entered //let is for global scoping
  if (userData.trim() != 0) { //user values arent only spaces
    addBtn.classList.add("active"); //active add button
  }
  else{
    addBtn.classList.remove("active");
  }

}

showTask();

addBtn.onclick =()=>{
  let userData = inputBox.value; // getting user entered value
  let getLocalStorage = localStorage.getItem("New Todo");// getting localStorage.
  if(getLocalStorage == null){
    listArr = [];//empty array
  }
  else{
    listArr = JSON.parse(getLocalStorage); //transformed json string into object
  }
  listArr.push(userData);  //pushing and adding new user data.
  localStorage.setItem("New Todo" , JSON.stringify(listArr)); //transforme=ing js object into json string.
  showTask(); //calling function
    addBtn.classList.remove("active");
}

// function to add list inside ul.
function showTask(){
  let getLocalStorage = localStorage.getItem("New Todo");// getting localStorage.
  if(getLocalStorage == null){
    listArr = [];//empty array
  }
  else{
    listArr = JSON.parse(getLocalStorage); //transformed json string into object
  }
  const pendingNumb = document.querySelector(".pendingNumb")
  pendingNumb.textContent = listArr.length; //passing the length value in pendingNumb.
  if(listArr.length > 0){
    deleteAllBtn.classList.add("active");
  }
  else{
    deleteAllBtn.classList.remove("active");
  }
  let newLiTag = '';
  listArr.forEach((element, index) => {
    newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class="fa fa-trash"></i></span></li>`;
  });
  todoList.innerHTML= newLiTag;  //adding new li tag in list
  inputBox.value = ""; //once task add leave input field empty.
}

//delete task function
function deleteTask(index){
  let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete particular index in li
    //after remove update new list.
    localStorage.setItem("New Todo" , JSON.stringify(listArr));//transforme=ing js object into json string.
    showTask();

}

//delete all tasks
deleteAllBtn.onclick = ()=>{
  listArr = []; //empty array
  //after delete all tasks again updates local localStorage
  localStorage.setItem("New Todo",JSON.stringify(listArr)); //transforming object to local stringify
  showTask();
}
