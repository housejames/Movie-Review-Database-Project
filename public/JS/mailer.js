const sendMailClick = document.querySelector(".sendMail");
sendMailClick.addEventListener("click", sendMail);

function sendMail() {
    let params = {
        email: document.getElementById("signupEmail").value,
    };

    console.log(params)

    const serviceId = "service_9q0x2xd";
    const templateId = "template_ynwaa0p";

    emailjs.send(serviceId, templateId, params)
        .then(
            res => {
                console.log(res);
            })
        .catch(err => console.log(err))
};