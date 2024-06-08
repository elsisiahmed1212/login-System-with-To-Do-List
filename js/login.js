var user_email = document.querySelector('#email')
var user_password = document.querySelector('#password')
var error_massage = document.querySelector('#worning')
var error_input = document.querySelector('#worning-input')
var btn_login = document.querySelector('#btlogin')
var user_list ;


if (localStorage.getItem('userinfo') == null){
    user_list =  [];
}
else{
    user_list = JSON.parse(localStorage.getItem('userinfo'))
}


btn_login.addEventListener('click',login)
function login(){
    if (validation(user_email)&& validation(user_password)) {
        var email = user_email.value;
        var password = user_password.value;

        // هني مشكله ان لو في داتا كبيره هيكون لود كبير علي الداتا بيز 
        user_list.forEach(function(user) {
            if(user.u_e == email && user.u_p == password){
                localStorage.setItem('sessionUsername', user.u_n)
                window.open('index.html','_self')
            }   
        });
    }
    else{
        error_massage.classList.replace('d-none','d-block')
    }
}

function validation(el){
        var Regex = {
        email:/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    }
    if (Regex[el.name].test(el.value)) {
        error_input.classList.replace('d-block','d-none')
        el.classList.add('is-valid')
        el.classList.remove('is-invalid')
        return true
    }
    else{
        error_input.classList.replace('d-none','d-block')
        el.classList.add('is-invalid')
        el.classList.add('is-valid')
        return false
    }
}