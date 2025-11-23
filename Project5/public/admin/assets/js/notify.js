//inital notyf
var notify = new Notyf({
    duration: 3000,
    position: {
        x: 'right',
        y: 'top'
    },
    dismissible: true,
});
//End inital notyf

//Show the success notify after redirect
const notifySession = sessionStorage.getItem("notify");
if (notifySession) {
    const notifyData = JSON.parse(notifySession);
    if (notifyData.code === "Success") {
        notify.success(notifyData.message);
    }
    if (notifyData.code === "Exist") {
        notify.error(notifyData.message);
    }
    sessionStorage.removeItem("notify");
}
//End show the success notify after redirect


//draw notify
const drawNotify = (code, message) => {
    const data = {
        code: code,
        message: message
    }
    sessionStorage.setItem("notify", JSON.stringify(data));
}
//End draw notify