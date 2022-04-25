
import { getFirestore, collection, addDoc, query, where, getDocs, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";



const UserImagesData = [];
const db = getFirestore();
const auth = getAuth();
var parentDiv = document.getElementById('result')


function displayUserImage() {
    parentDiv.innerHTML = "";
    for (let i = 0; i < UserImagesData.length; i++) {
        let res = UserImagesData[i].image;
        parentDiv.innerHTML = parentDiv.innerHTML + `<div class="uploaded-image" id=${UserImagesData[i].id}>
            <img  class="finalimage" src=${res} alt="">
                <div class="buttons">
                    <button  class="likebtn" >Likes : ${UserImagesData[i].liked.length} </button>
                    <button  class="sharebtn">Share</button>
                </div>
        </div>`;

    }
    // console.log(UserImagesData);
}

async function share_image(event) {
    // console.log('share button woking ', event);
    const shareUrL = `http://127.0.0.1:5500/shared.html?id=${event.target.parentNode.parentNode.id}`;
    navigator.clipboard.writeText(shareUrL);
    alert("Link copied to clipboard");
}

async function like_image(event) {
    // console.log('like btn clicked clicked', event);
    // console.log(event.target.parentNode.parentNode.id);

    const imageRef = doc(db, "images", event.target.parentNode.parentNode.id);
    const image = await getDoc(imageRef);

    // console.log(image.data());

    if (image.data().liked.includes(getAuth().currentUser.email)) {
        await updateDoc(imageRef, {
            liked: arrayRemove(getAuth().currentUser.email)
        });
        const likebtn = document.querySelector(`#${event.target.parentNode.parentNode.id} .likebtn`);
        // console.log(likebtn);
        likebtn.innerHTML = `Likes ${image.data().liked.length - 1}`

    } else {
        await updateDoc(imageRef, {
            liked: arrayUnion(getAuth().currentUser.email)
        });
        const likebtn = document.querySelector(`#${event.target.parentNode.parentNode.id} .likebtn`);
        // console.log(likebtn);
        likebtn.innerHTML = `Likes ${image.data().liked.length + 1}`

    }

    // console.log("done")
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        const getUsersImage = async () => {
            const imagesRef = collection(db, "images");
            const q = query(imagesRef, where("email", "==", user.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                UserImagesData.push({ ...doc.data(), id: doc.id });
            });
            // console.log(UserImagesData);

            displayUserImage();

            const likebtns = document.querySelectorAll('.likebtn');
            likebtns.forEach(likebtn => {
                likebtn.addEventListener('click', like_image);
            });

            const sharebtns = document.querySelectorAll('.sharebtn');
            sharebtns.forEach(sharebtns => {
                sharebtns.addEventListener('click', share_image);
            });

        }
        getUsersImage();


        // ...
    } else {
        // User is signed out
        // ...
    }
});



document.getElementById("add-image-form").addEventListener("submit", (event) => {
    event.preventDefault()
})



function uploadImage() {
    const imgInp = document.getElementById("input-image");
    // console.log(imgInp.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(imgInp.files[0]);
    reader.addEventListener("load", async () => {
        // console.log(reader.result);

        try {
            console.log(getAuth().currentUser.email);
            const docRef = await addDoc(collection(db, "images"), {
                email: getAuth().currentUser.email,
                image: reader.result,
                liked: [],
            });
            UserImagesData.push({
                email: getAuth().currentUser.email,
                image: reader.result,
                liked: [],
                id: docRef.id,
            })
            displayUserImage()
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.log(error);
        }

    })
}


document.getElementById("upload-btn").addEventListener("click", uploadImage);














