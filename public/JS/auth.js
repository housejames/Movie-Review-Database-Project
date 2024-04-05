//Signup form
const signupForm = document.querySelector("#signup");
signupForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const userObj = {
        username: document.querySelector("#signupName").value,
        email: document.querySelector("#signupEmail").value,
        password: document.querySelector("#signupPassword").value,
    }
    fetch("/api/users",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
        //    location.href = "/profile"
        } else {
            alert("Please fill out all fields")
        }
    })
})