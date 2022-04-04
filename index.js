document.getElementById("signinform").addEventListener("submit",(event)=>{
    event.preventDefault()
})

const txtEmail = document.getElementById('txtEmail')
const txtPassword = document.getElementById('txtPassword')
const btnSignIn = document.getElementById('btnSignIn')


btnSignIn.addEventListener('click', e =>{
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
    

})