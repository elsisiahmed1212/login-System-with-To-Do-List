var user_name = document.querySelector('#name')
var user_email = document.querySelector('#email')
var user_password = document.querySelector('#password')
var error_massage = document.querySelector('#worning')
var email_worning = document.querySelector('#email_worning')
var btn = document.querySelector('#btn')
var user_list;


if(localStorage.getItem('userinfo') == null){
    user_list =  [];
}
else{
    user_list = JSON.parse(localStorage.getItem('userinfo'));
}
btn.addEventListener('click',new_user)
function new_user(){
    if(validation(user_name)&&validation(user_email) && validation(user_password)){
        //
        if(isEmailExists(user_email.value)){
            email_worning.classList.replace('d-none','d-block');
        }
        //
        else{
            var user_obg = {
                u_n:user_name.value,
                u_e:user_email.value,
                u_p:user_password.value,
            }
            user_list.push(user_obg)
            localStorage.setItem('userinfo',JSON.stringify(user_list))
            clear()
            window.open('singin.html','_self')
        }
    }
}

function clear(){
    user_name.value=null;
    user_email.value=null;
    user_password.value=null;
}
function validation(el){
    var Regex = {
        name: /^[a-z0-9_-]{3,15}$/,
        email:/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    }
    if (Regex[el.name].test(el.value)) {
        error_massage.classList.replace('d-block','d-none')
        el.classList.add('is-valid')
        el.classList.remove('is-invalid')
        return true
    }
    else{
        error_massage.classList.replace('d-none','d-block')
        el.classList.add('is-invalid')
        el.classList.add('is-valid')
        return false
    }
}

function isEmailExists(email) {
    return user_list.some(function(user) {
        if (user.u_e === email){
            return true
        }
    });
}
