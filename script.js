// LOGIN
function login(){
 window.location.href="home.html";
}

// HOME → TODO
function openTodo(){
 window.location.href="todo.html";
}

// TODO LOGIC
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
 localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render(){
 const list = document.getElementById("taskList");
 if(!list) return;
 list.innerHTML="";
 tasks.forEach((t,i)=>{
  const div=document.createElement("div");
  div.className="task"+(t.done?" completed":"");
  div.innerHTML=`
   <input type="checkbox" ${t.done?"checked":""} onclick="toggle(${i})">
   <span onclick="editTask(${i})">${t.text}</span>
   <button onclick="del(${i})">✖</button>
  `;
  list.appendChild(div);
 });
}

function addTask(){
 const input=document.getElementById("taskInput");
 if(input.value==="") return;
 tasks.push({text:input.value,done:false});
 input.value="";
 saveTasks();
 render();
}

function toggle(i){
 tasks[i].done=!tasks[i].done;
 saveTasks();
 render();
}

function del(i){
 tasks.splice(i,1);
 saveTasks();
 render();
}

function editTask(i){
 const newTask=prompt("Edit Task",tasks[i].text);
 if(newTask){
  tasks[i].text=newTask;
  saveTasks();
  render();
 }
}

window.onload=render;