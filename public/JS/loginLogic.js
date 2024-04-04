if(!sessionStorage.loged_in){
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
            sessionStorage.setItem('loggedin', true)
        if(res.ok){
            document.location.replace('/')
        } else {
            alert("failed login")
        }
    })
})
}