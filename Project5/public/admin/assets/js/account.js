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

//Login Form
const loginForm = document.querySelector('#loginForm');
if (loginForm) {
    const validator = new JustValidate('#loginForm');
    validator
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Email is required'
            }
            ,
            {
                rule: 'email',
                errorMessage: 'Email is not valid'
            }
            , {
                rule: 'maxLength',
                value: 50,
                errorMessage: 'Email must be less than 50 characters'
            }
        ])
        .addField('#password', [
            {
                rule: 'required',
                errorMessage: 'Password is required'
            }
        ])
        .onSuccess((event) => {
            const email = event.target.email.value;
            const Password = event.target.password.value;
            const rememberPass = event.target.rememberPassword.checked;
            console.log('Login Form Submitted', { email, Password, rememberPass });
            // You can add your form submission logic here
        });

}
//End login form



//register Form
const registerForm = document.querySelector('#registerForm');
if (registerForm) {
    const validator = new JustValidate('#registerForm');
    validator
        .addField('#fullName', [
            {
                rule: 'required',
                errorMessage: 'Full Name is required'
            }
            , {
                rule: 'maxLength',
                value: 50,
                errorMessage: 'Full Name must be less than 50 characters'
            }
            , {
                rule: 'customRegexp',
                value: /^[a-zA-Z\s]+$/,
                errorMessage: 'Full Name can only contain letters and spaces'
            }
        ])
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Email is required'
            }
            , {
                rule: 'email',
                errorMessage: 'Email is not valid'
            }
            , {
                rule: 'maxLength',
                value: 50,
                errorMessage: 'Email must be less than 50 characters'
            }
        ])
        .addField('#password', [
            {
                rule: 'required',
                errorMessage: 'Password is required'
            }
            ,
            {
                rule: 'minLength',
                value: 6,
                errorMessage: 'Password must be at least 6 characters'
            }
            ,
            {
                rule: 'customRegexp',
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                errorMessage: 'Password must contain at least one letter and one number'
            }
        ])
        .addField('#agree', [
            {
                rule: 'required',
                errorMessage: 'You must agree to the terms and conditions'
            }
        ])
        .onSuccess((event) => {
            const email = event.target.email.value;
            const Password = event.target.password.value;
            const fullname = event.target.fullName.value;

            const dataFinal = {
                fullname: fullname,
                email: email,
                password: Password
            };

            fetch(`/${pathAdmin}/account/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataFinal)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code === "Exist") {
                        notify.error(data.message);
                    }
                    if (data.code === "Success") {
                        drawNotify(data.code, data.message);
                        window.location.href = `/${pathAdmin}/account/register-initial`;
                    }
                })
        });

}
//End register form