import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

var UserImagesData = {};
const db = getFirestore();
const auth = getAuth();
var parentDiv = document.getElementById('sharedimage');
let userinfo = null;

document.getElementById("signinform").addEventListener("submit", (event) => {
    event.preventDefault()
})

function displayUserImage() {

    let res = UserImagesData.image;
    console.log(res);
    parentDiv.innerHTML = `<div class="uploaded-image" id=${UserImagesData.id}>
            <img  class="finalimage" src=${res} alt="">
                <div class="buttons">
                    <button  id="likebtn" >Likes : ${UserImagesData.liked.length} </button>
                    <button  id="sharebtn">Share</button>
                </div>
        </div>`;


    document.getElementById('likebtn').addEventListener('click', like_image);
}

async function shared_image(event) {
    // console.log('clicked', event);
    const urlParams = new URLSearchParams(window.location.search);
    const ID = urlParams.get('id');
    // console.log(ID);

    const imageRef = doc(db, "images", ID);
    const image = await getDoc(imageRef);

    console.log(image.data());
    UserImagesData = { ...image.data(), id: ID };

    displayUserImage();
}


shared_image();

function signin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            // alert(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code
            alert(errorCode)
            const errorMessage = error.message
            alert(errorMessage)
            // ..
        })
}

document.getElementById("btnSignIn").addEventListener('click', signin);

async function like_image(event) {
    
    if (userinfo) {
        // console.log("loggedin");
        // console.log('like btn clicked clicked', event);
        // console.log(event.target.parentNode.parentNode.id);

        const imageRef = doc(db, "images", event.target.parentNode.parentNode.id);
        const image = await getDoc(imageRef);

        // console.log(image.data());

        if (image.data().liked.includes(userinfo.email)) {
            await updateDoc(imageRef, {
                liked: arrayRemove(userinfo.email)
            });
            const likebtn = document.querySelector(`#${event.target.parentNode.parentNode.id} #likebtn`);
            likebtn.innerHTML = `Likes ${image.data().liked.length - 1}`


        } else {
            await updateDoc(imageRef, {
                liked: arrayUnion(userinfo.email)
            });
            const likebtn = document.querySelector(`#${event.target.parentNode.parentNode.id} #likebtn`);
            likebtn.innerHTML = `Likes ${image.data().liked.length + 1}`

        }
        // ...
    } else {
        // User is signed out
        // ...
        document.querySelector(".popup").style.display = "flex";


    }
    
}


document.querySelector(".close").addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
});

document.getElementById("btnSignIn").addEventListener('click', signin);

onAuthStateChanged(auth, (user) => {
    if (user) {
        userinfo = user;
        // console.log('user is signed in');
        document.getElementById("btnSignOut").style.display = "block";
        document.getElementById("user-email").innerText = user.email;
    } else {
        userinfo = null;
        // console.log('user is signed out');
        document.getElementById("btnSignOut").style.display = "none";
        document.getElementById("user-email").innerText = "";
    }
});

function signout() {
    signOut(auth).then(() => {
        // Sign-out successful.
        // console.log("signed out successfully")
      
    }).catch((error) => {
        // An error happened.
        console.log("some error occured!!")
    });
}

document.getElementById("btnSignOut").addEventListener('click', signout);

document.querySelector("#btnSignIn").addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
})





