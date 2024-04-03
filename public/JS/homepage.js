//Login form
const writeRoute = document.querySelector(".writebtn");
writeRoute.addEventListener('click', (e)=>{
    document.location.replace('/review')
})

if(!sessionStorage.logged_in){
    const loginForm = document.querySelector("#loginBtn");
    loginForm.addEventListener('click',(e)=>{
        e.preventDefault();
        const logObj = {
            email:document.querySelector("#loginEmail").value,
            password:document.querySelector("#loginPassword").value,
        }
        fetch("/api/users/login",{
            method:"POST",
            body:JSON.stringify(logObj),
            headers:{
            "Content-Type":"application/json"
            }
        }).then(res=>{
        if(res.ok){
            document.location.replace('/')
        } else {
            alert("failed login")
        }
    })
})
}


