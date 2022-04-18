import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

document.getElementById("SIGNUP").addEventListener("submit", (event) => {
  event.preventDefault()
})

const auth = getAuth();

function signup() {
  const email = document.getElementById("email").value
  const password = document.getElementById("psw").value
  const confirmPassword = document.getElementById("confirmpsw").value
  console.log(email, password, confirmPassword)
  if (password === confirmPassword) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("created");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error);
        const errorMessage = error.message;
        // ..
      })
  }
  else {
    alert("Password Not matches");
  }
}

document.getElementById("btnsignUp").addEventListener('click', signup);




onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user)
    const uid = user.uid;
    window.location.href = "http://127.0.0.1:5500/loggedin.html"
    // ...
  } else {
    console.log("not signed in")
  }
});