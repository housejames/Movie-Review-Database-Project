// document.querySelector("#newProject").addEventListener("submit",(e)=>{
//     e.preventDefault();
//     const projObj = {
//         name: document.querySelector("#projectName").value,
//         description: document.querySelector("#projectDescription").value,
//         needed_funding: document.querySelector("#projectFunding").value,
//     }
//     fetch("/api/projects",{
//         method:"POST",
//         body:JSON.stringify(projObj),
//         headers:{
//             "Content-Type":"application/json"
//         }
//     }).then(res=>{
//         if(res.ok){
//            location.reload()
//         } else {
//             alert("trumpet sound")
//         }
//     })
// })

// const delBtns = document.querySelectorAll(".del-button");
// delBtns.forEach(btn=>{
//     btn.addEventListener("click",(e)=>{
//         const idToDel = e.target.getAttribute("data-proj-id");
//         fetch(`/api/projects/${idToDel}`,{
//             method:"DELETE", 
//         }).then(res=>{
//             if(res.ok){
//                location.reload()
//             } else {
//                 alert("trumpet sound")
//             }
//         })
//     })
// })