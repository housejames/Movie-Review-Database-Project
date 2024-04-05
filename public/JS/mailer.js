const sendMailClick = document.querySelector(".sendMail");
sendMailClick.addEventListener("click", sendMail);

function sendMail() {
    alert("hooray!")
    let params = {
        email: document.getElementById("signupEmail").value,
    };

    console.log(params)

    const serviceId = "service_9q0x2xd";
    const templateId = "template_ynwaa0p";

    emailjs.send(serviceId, templateId, params)
        .then(
            res => {
                // document.getElementById("signupName").value = "";
                // document.getElementById("signupEmail").value = "";
                // document.getElementById("signupPassword").value = "";
                console.log(res);
                alert("Thank you for signing up, please check your email");
            })
        .catch(err => console.log(err))
};