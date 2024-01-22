import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getDatabase, ref, push} from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js'

const appSetting = {
    // databaseURL: "https://clone-b3bd0-default-rtdb.firebaseio.com/"
    databaseURL: "https://clone-private-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)
const users_in_db = ref(database, "users")

let form = document.querySelector("#form")
let user_name = document.querySelector("#Username")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let confirm_password = document.querySelector("#confirm_password")

form.addEventListener("submit", (event) => {
    
    formValidation();
    if (isFormValid()) {
        push_to_firebase()
        form.submit()
    }
    else{
        event.preventDefault();
    }
})

user_name.addEventListener("change", (event) => {
    username_validation()
})

email.addEventListener("change", (event) => {
    email_validation()
})

password.addEventListener("change", (event) => {
    password_validation()
})

confirm_password.addEventListener("change", (event) => {
    confirmPassword_validation()
})


function isFormValid(){
    let input_box = document.querySelectorAll(".input_box")
    let result = true
    input_box.forEach((box) => {
        if (box.classList.contains("error")) {
            result = false
        }
    });
    return result
}


function username_validation() {
    if (user_name.value.trim() == "") {
        setError(user_name, "username cannot be empty")
    }
    else if(user_name.value.trim().length < 5 || user_name.value.trim().length > 20){
        setError(user_name, "username must be between 5 to 20 characters")
    }
    else{
        setSuccess(user_name, "success")
    }
}


function email_validation() {
    if(email.value.trim()==''){
        setError(email, 'Provide email address');
    }else if(isEmailValid(email.value)){
        setSuccess(email, "success");
    }else{
        setError(email, 'Provide valid email address');
    }
}


function password_validation() {
    if(password.value.trim()==''){
        setError(password, 'Password can not be empty');
    }else if(password.value.trim().length <6 || password.value.trim().length >20){
        setError(password, 'Password min 6 max 20 charecters');
    }else {
        setSuccess(password, "success");
    }
}


function confirmPassword_validation() {
    if(confirm_password.value.trim()==''){
        setError(confirm_password, 'Password can not be empty');
    }else if(confirm_password.value !== password.value){
        setError(confirm_password, 'Password does not match');
    }else {
        setSuccess(confirm_password, "success");
    }
}


function formValidation(){
    username_validation()    

    email_validation()

    password_validation()

    confirmPassword_validation()
}

function setError(element, message){
    const parent = element.parentElement;
    if (parent.classList.contains("success")) {
        parent.classList.remove("success")
    }
    parent.classList.add("error")
    const para = parent.querySelector("p")
    para.textContent = message
}

function setSuccess(element, message) {
    const parent = element.parentElement;
    if (parent.classList.contains("error")) {
        parent.classList.remove("error")
    }
    parent.classList.add("success")
    const para = parent.querySelector("p")
    para.textContent = message
}

function isEmailValid(email){
    const reg =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return reg.test(email);
}


function push_to_firebase(){
    let input_value = {
        userName: `${user_name.value}`,
        email: `${email.value}`,
        password: `${password.value}`
    }

    push(users_in_db, input_value)
}