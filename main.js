var toDoForm = document.getElementById("todo-form");
var toDoInput = document.querySelector("input");
var toDoList = document.getElementById("todo-list");
var TODOS_KEY = "todos";
var toDos = [];
function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}
function deleteToDo(event) {
    var li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(function (toDo) { return toDo.id !== parseInt(li.id); });
    saveToDos();
}
function chekcToDo(event) {
    var li = event.target.parentElement;
    toDos.map(function (toDo) {
        if (toDo.id === parseInt(li.id)) {
            if (toDo.checked === false) {
                toDo.checked = true;
                li.style.textDecoration = "line-through";
            }
            else {
                toDo.checked = false;
                li.style.textDecoration = "none";
            }
        }
    });
    saveToDos();
}
function paintToDo(newTodo) {
    if (!toDoList)
        return;
    var li = document.createElement("li");
    li.id = newTodo.id.toString();
    var span = document.createElement("span");
    span.innerText = newTodo.text;
    var button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    var checkbutton = document.createElement("button");
    checkbutton.innerText = "✅";
    checkbutton.addEventListener("click", chekcToDo);
    li.appendChild(span);
    li.appendChild(button);
    li.appendChild(checkbutton);
    toDoList.appendChild(li);
}
function handleToDoSubmit(event) {
    // js가 발생한 이벤트를 인자 event로 준다.
    event.preventDefault();
    var newTodo = toDoInput === null || toDoInput === void 0 ? void 0 : toDoInput.value; // input의 현재 value를 새로운 변수에 복사
    if (toDoInput !== null) {
        toDoInput.value = "";
    }
    if (newTodo) {
        toDoInput.value = "";
        var newTodoObj = {
            text: newTodo,
            id: Date.now(),
            checked: false
        };
        toDos.push(newTodoObj);
        paintToDo(newTodoObj);
        saveToDos();
    }
}
toDoForm === null || toDoForm === void 0 ? void 0 : toDoForm.addEventListener("submit", handleToDoSubmit);
var savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
    // 만약 savedToDos가 localStorage에 존재하면 -> 그냥 if(savedToDos) {} 이렇게 해도 됨
    var parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}
