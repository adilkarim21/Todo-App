var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

var app = firebase.initializeApp(firebaseConfig);
var ulElement = document.getElementById('list');

async function fetchTodos() {
  var snapshot = await  firebase.database().ref('todolist').once('value');
  var todos = snapshot.val();
  console.log(todos);
  
  
  for (var id in todos) {
    var todoValue = todos[id];
    addTodoToUI(todoValue);
  }
}

async function addtodo() {
  var input = document.getElementById('inputField');

  if (input.value) {
    try {
      await firebase.database().ref("/todolist/").push(input.value);

      addTodoToUI(input.value);

      input.value = "";
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  } else {
    alert("Fill the field..");
  }
}

function addTodoToUI(todoValue) {
  var liElement = document.createElement('li');
  var liText = document.createTextNode(todoValue);
  liElement.appendChild(liText);

  ulElement.appendChild(liElement);

  var delBtnElement = document.createElement('button');
  var delBtnText = document.createTextNode('Delete');
  delBtnElement.appendChild(delBtnText);
  liElement.appendChild(delBtnElement);
  delBtnElement.setAttribute('onclick', 'deleteSingleItem(this)');
  delBtnElement.setAttribute('class', 'deleteButtonSetting');

  var editBtnElement = document.createElement('button');
  var editBtnText = document.createTextNode('Edit');
  editBtnElement.appendChild(editBtnText);
  liElement.appendChild(editBtnElement);
  editBtnElement.setAttribute('onclick', 'editItem(this)');
  editBtnElement.setAttribute('class', 'editButtonSetting');
}

function deleteAllItems() {
  firebase.database().ref("todolist").remove();
  ulElement.innerHTML = "";
}

function deleteSingleItem(d) {
  d.parentNode.remove();
}

function editItem(e) {
  var updatedValue = prompt("Enter updated value..");
  e.parentNode.firstChild.nodeValue = updatedValue;
}


window.onload = function() {
  fetchTodos();
};
