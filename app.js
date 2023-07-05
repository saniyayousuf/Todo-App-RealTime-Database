
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { 
    getDatabase ,
    set,
    ref,
    push,
    onValue,
    remove,
    update,

} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDvCkgTAtilT44ihFx_IpxkoHu-GP1vsPM",
    authDomain: "todo-list-app-database.firebaseapp.com",
    projectId: "todo-list-app-database",
    storageBucket: "todo-list-app-database.appspot.com",
    messagingSenderId: "454966946535",
    appId: "1:454966946535:web:c905fbfbf829d3c2021042"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
 const db = getDatabase(app)

 ////////////////////////////////////////////////////////////////////////////////
   
 var input = document.getElementById("ipt")

window.add = function () {
     var obj = {

        userInput : input.value,

     }
     var Refrence = push(ref(db, 'todos/'))

     obj.id = Refrence.key

     set(Refrence , obj)
     getData()
     
}


window.deleteAll = function (id) {
    remove(ref(db , `todos/`))
}



window.getData = function () {

    var data = document.getElementById("Data")

    onValue(ref(db, 'todos/') , function (todo)
    {
        data.innerHTML = " "
        var todos = Object.values(todo.val())
        for(var i = 0 ; i < todos.length ; i++){
            var renderData = todos[i]
             data.innerHTML += `<p >Task  : ${renderData.todo}   
             <button onclick="editTodo('${renderData.id}')" >EDIT</button>
             <button onclick="delnode('${renderData.id}')" >DELETE</button> </p> <br/>`
        }
        var Input = document.getElementById('ipt').value = ""
    })
}



window.delnode = function (id) {
    remove(ref(db, `todos/${id}`))
}

window.editTodo = function (id) {
    // console.log(id);
    var NewTodo = prompt('Enter Update')

    update(ref(db, `todos/${id}`), {
        todo: NewTodo
    })
}