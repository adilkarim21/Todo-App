var firebaseConfig = {
    apiKey: "AIzaSyAFsv2MNMTt0LJ_VbxMHkKzj7cRgy51ORg",
    authDomain: "todo-app-program.firebaseapp.com",
    projectId: "todo-app-program",
    storageBucket: "todo-app-program.firebasestorage.app",
    messagingSenderId: "996802925130",
    appId: "1:996802925130:web:b6d34a7f6e2655c6f00cb3"
};
  
var app = firebase.initializeApp(firebaseConfig);



function signUp() {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    console.log(name.value);
    console.log(email.value);
    console.log(password.value);

    firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log(user);
    
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    
    // ..
  });    
}


