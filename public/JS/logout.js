document.querySelector(".logout").addEventListener("click",()=>{
    fetch("/api/users/logout",{
        method:"POST"
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})