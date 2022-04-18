import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

document.getElementById("signinform").addEventListener("submit", (event) => {
    event.preventDefault()
})

const auth = getAuth();

function signin() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(email, password)

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(error);
            const errorMessage = error.message;
            // ..
        })
}

document.getElementById("btnSignIn").addEventListener('click', signin);

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