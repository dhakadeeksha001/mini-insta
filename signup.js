import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const auth = getAuth();

const signUp = ({email, password,username,confirmPassword})=>{
    console.log(email,password)
if(password===confirmPassword)
{
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log(error);
    const errorMessage = error.message;
    // ..
  })
}else{
    alert("Password Not matches");
}
   
}