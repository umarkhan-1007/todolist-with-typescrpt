import "./style.css"

interface Todo {
 readonly id: string,
 title : string,
 isComplet: boolean
}

const todos:Todo[] = []

const todoCon = document.querySelector(".todoCon") as HTMLDivElement

const todoinput = document.getElementById("todoInput") as HTMLInputElement

const todoForm = document.getElementById("todoForm") as HTMLFormElement



todoForm.onsubmit = (e:SubmitEvent) => {
    e.preventDefault();
    const todo:Todo ={
        title:todoinput.value,
        isComplet:false,
        id:String(Math.random()*100)
    }

    todos.push(todo)
    todoinput.value= ""
    console.log(todos)
    renderTodo(todos)
} 


const getnaretTodoItem = (id:string, isComplet:boolean, title:string) => {
    const todo:HTMLDivElement = document.createElement("div") 
    todo.className = "todo"

    //createing Cheack
    const todoCheckBox:HTMLInputElement = document.createElement("input")
    todoCheckBox.type = "checkbox"
    todoCheckBox.className = "todoCheckBox"
    todoCheckBox.checked = isComplet
    todoCheckBox.onchange = () => {
        todos.find((items) => {
            if(items.id === id) items.isComplet = todoCheckBox.checked
        })
        paragraph.className = todoCheckBox.checked ? "textCut" : ""
    }
    
    //creating title paragraph
    const paragraph:HTMLParagraphElement = document.createElement("p")
    paragraph.innerText = title;
    paragraph.className = isComplet ? "textCut" : ""

    //creating btn
    const btn:HTMLButtonElement = document.createElement("button")
    btn.innerHTML = "X"
    btn.className = "deleteBtn"
    btn.onclick = () => {
        deleteTodo(id)
    }

    //appending todoitems
    todo.append(todoCheckBox,paragraph,btn)
    todoCon.append(todo)

}

const deleteTodo = (id:string) => {
    const idx = todos.findIndex(items => items.id===id)
    todos.splice(idx,1)
    renderTodo(todos)

}

const renderTodo = (todos:Todo[]) => {
    todoCon.innerText = ""
        todos.forEach(items=>{
            getnaretTodoItem(items.id, items.isComplet, items.title)
        })
}