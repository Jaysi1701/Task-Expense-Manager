const loginForm =
document.getElementById("loginForm");

const message =
document.getElementById("message");

function validateLogin(email, password){

    if(email === "" || password === ""){
        return "All fields are required";
    }

    return "Login Successful";
}

loginForm.addEventListener("submit", (event)=>{

    event.preventDefault();

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const result =
    validateLogin(email, password);

    message.textContent = result;

});