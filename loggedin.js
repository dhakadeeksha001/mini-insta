
import { onAuthStateChanged, getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const auth = getAuth();

document.getElementById("add-button").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "flex";
})

document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
})

// document.querySelector('#upload-btn').addEventListener("click", function () {
//   location.reload
// })

document.querySelector("#upload-btn").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
})

function signout() {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("signed out successfully")
  }).catch((error) => {
    // An error happened.
    console.log("some error occured!!")
  });
}

document.getElementById("btnSignOut").addEventListener('click', signout);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.email)
    document.getElementById("user-email").innerText = user.email;
    const uid = user.uid;
    // ...
  } else {
    console.log("not signed in")
    window.location.href = "http://127.0.0.1:5500/index.html"
  }
});