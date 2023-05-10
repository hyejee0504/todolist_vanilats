interface ToDo {
    text: string;
    id: number;
    checked: boolean;
  }
  
  const toDoForm = document.getElementById("todo-form") as HTMLFormElement;
  const toDoInput = document.querySelector("input") as HTMLInputElement | null;
  const toDoList = document.getElementById("todo-list") as HTMLUListElement | null;
  
  const TODOS_KEY = "todos";
  
  let toDos: ToDo[] = [];
  
  function saveToDos(): void {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  }
  
  function deleteToDo(event: MouseEvent): void {
    const li = (event.target as HTMLElement).parentElement as HTMLLIElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
  }

  function chekcToDo(event: MouseEvent): void{
    const li = (event.target as HTMLElement).parentElement as HTMLLIElement;
    toDos.map((toDo) => {
        if(toDo.id === parseInt(li.id)){
            if(toDo.checked === false){
                toDo.checked = true;
                li.style.textDecoration = "line-through";
            }else{
                toDo.checked = false;
                li.style.textDecoration = "none";
            }
        }
    })
    saveToDos();
    }
    
  
  function paintToDo(newTodo: ToDo): void {
    if (!toDoList) return;
    const li = document.createElement("li");
    li.id = newTodo.id.toString();
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    const checkbutton = document.createElement("button");
    checkbutton.innerText = "✅"
    checkbutton.addEventListener("click", chekcToDo);
    li.appendChild(span);
    li.appendChild(button);
    li.appendChild(checkbutton);
    toDoList.appendChild(li);
  }

function handleToDoSubmit(event: { preventDefault: () => void; }) {
  // js가 발생한 이벤트를 인자 event로 준다.
  event.preventDefault();
  const newTodo = toDoInput?.value; // input의 현재 value를 새로운 변수에 복사
  if(toDoInput !== null){
    toDoInput.value = "";
  }
  if (newTodo) {
    toDoInput.value = "";
    const newTodoObj = {
      text: newTodo,
      id: Date.now(),
      checked : false
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
  }
}


toDoForm?.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  // 만약 savedToDos가 localStorage에 존재하면 -> 그냥 if(savedToDos) {} 이렇게 해도 됨
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}





