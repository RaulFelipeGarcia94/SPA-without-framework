// Model
const model = {
  todos: [], //local storage, db
  addTodo: function (todo) {
    this.todos.push(todo);
  },
};

// View
const view = {
  todoList: document.getElementById("todo-list"),
  renderTodo: function (todo, isChecked) {
    const todoItem = document.createElement("li"); 
    const todoButtons = document.createElement("div"); 
    todoItem.textContent = todo;
    todoItem.style.marginBottom = "10px";
    todoItem.style.fontSize = "18px";

     const checkbox = document.createElement("input");
     checkbox.type = "checkbox";
     checkbox.checked = isChecked;
     
    checkbox.addEventListener("change", function () {
      controller.toggleTodoStatus(todo, checkbox.checked);
    });
     checkbox.style.marginLeft = "8px";

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.addEventListener("click", function () {
      const updatedTodo = prompt("Editar item:", todo);
      const hasValueTodos = model.todos.includes(todo)
      if(updatedTodo === '') {
        alert("Este campo não pode ser vazio!")
        return
      }
      if (updatedTodo !== '' && !hasValueTodos || updatedTodo === todo) {
        controller.editTodo(todo, updatedTodo);
      } else {
        alert('Já existe a mesma tarefa cadastrada!')
      }
    });
    editButton.style.backgroundColor = "orange";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.addEventListener("click", function () {
      controller.deleteTodo(todo);
    });
    deleteButton.style.backgroundColor = "red";
    
    
    todoItem.appendChild(todoButtons)
    todoButtons.appendChild(checkbox);
    todoButtons.appendChild(editButton);
    todoButtons.appendChild(deleteButton);
    this.todoList.appendChild(todoItem);
  },

  renderSortButton: function () {
    const sortButton = document.getElementById("todo-sort")
    sortButton.addEventListener("click", function () {
      controller.sortTodos();
    });
  },
};

// Controller
const controller = {
  init: function () {
    const todoForm = document.getElementById("todo-form");
    todoForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const todoInput = document.getElementById("todo-input");
      const todo = todoInput.value;
      const hasValueTodos = model.todos.includes(todo)
      if(todo.trim() === ""){
        alert("Este campo não pode ser vazio!")
        return
      }
      if (todo.trim() !== "" && !hasValueTodos) {
        model.addTodo(todo);
        view.renderTodo(todo);
        todoInput.value = "";
      } else {
        alert("Já existe a mesma tarefa cadastrada!")
      }
    });

    view.todoList.addEventListener("click", function (event) {
      if (event.target && event.target.tagName === "BUTTON") {
        const todoText = event.target.parentElement.textContent.trim();
        controller.deleteTodo(todoText);
      }
    });

    view.renderSortButton()
  },

  deleteTodo: function (todo) {
    const index = model.todos.indexOf(todo);
    if (index !== -1) {
      model.todos.splice(index, 1);
    }

    view.todoList.innerHTML = "";
    model.todos.forEach(function (todo) {
      view.renderTodo(todo);
    });
  },

  editTodo: function (oldTodo, updatedTodo) {
    const index = model.todos.indexOf(oldTodo);
    if (index !== -1) {
      model.todos[index] = updatedTodo;
    }

    view.todoList.innerHTML = "";
    model.todos.forEach(function (todo) {
      view.renderTodo(todo);
    });
  },

  sortTodos: function () {
    model.todos.sort();

    view.todoList.innerHTML = "";
    model.todos.forEach(function (todo) {
      view.renderTodo(todo);
    });
  },

  toggleTodoStatus: function (todo, isChecked) {
    let index = model.todos.indexOf(todo);

    if (index !== -1) {
      if (!isChecked) {
        model.todos[index] = todo.replace(/\s\(feito\)$/, '');
      } else {
        model.todos[index] = `${todo} (feito)`;
      }
    }
    
    view.todoList.innerHTML = "";
    model.todos.forEach(function (todo) {
      const isChecked = todo.includes("(feito)");
      view.renderTodo(todo, isChecked);
    });
  },
};

controller.init();
