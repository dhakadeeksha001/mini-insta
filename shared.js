import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";


var UserImagesData = {};
const db = getFirestore();
const auth = getAuth();
var parentDiv = document.getElementById('sharedimage');

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
    console.log('clicked', event);
    const urlParams = new URLSearchParams(window.location.search);
    const ID = urlParams.get('id');
    console.log(ID);

    const imageRef = doc(db, "images", ID);
    const image = await getDoc(imageRef);

    console.log(image.data());
    UserImagesData = { ...image.data(), id: image.id };

    displayUserImage();
}


shared_image();

async function like_image(event) {
    console.log('like btn clicked clicked', event);
    console.log(event.target.parentNode.parentNode.id);

    const imageRef = doc(db, "images", event.target.parentNode.parentNode.id);
    const image = await getDoc(imageRef);

    console.log(image.data());

    if (image.data().liked.includes(getAuth().currentUser.email)) {
        await updateDoc(imageRef, {
            liked: arrayRemove(getAuth().currentUser.email)
        });
        const likebtn = document.querySelector(`#${event.target.parentNode.parentNode.id} .likebtn`);
        likebtn.innerHTML = `Likes ${image.data().liked.length - 1}`


    } else {
        await updateDoc(imageRef, {
            liked: arrayUnion(getAuth().currentUser.email)
        });
        const likebtn = document.querySelector(`#${event.target.parentNode.parentNode.id} .likebtn`);
        likebtn.innerHTML = `Likes ${image.data().liked.length + 1}`
    }

    console.log("done")
}


