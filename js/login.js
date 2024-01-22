import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getDatabase, ref, onValue} from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js'

const appSetting = {
    // databaseURL: "https://clone-b3bd0-default-rtdb.firebaseio.com/"
    databaseURL: "https://clone-private-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)
const users_in_db = ref(database, "users")

onValue(users_in_db, function(snapshort) {
    let users_array = Object.values(snapshort.val())
    console.log(users_array)
})



let form = document.querySelector("#container")
let user_name = document.querySelector("#Username")
let password = document.querySelector("#password")

form.addEventListener("submit", (event) => {
    formValidation();
    if (isFormValid()) {
        form.submit()
    }
    else{
        event.preventDefault();
    }
})

user_name.addEventListener("change", (event) => {
    username_validation()
    
})

password.addEventListener("change", (event) => {
    password_validation()
    
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

    onValue(users_in_db, function(snapshort) {
        let users_array = Object.values(snapshort.val())
        let user_name_value = user_name.value

        for (let i = 0; i < users_array.length; i++) {
            let current_user = users_array[i]
            console.log(current_user)
            console.log(user_name_value, current_user.userName)
            if(user_name_value == current_user.userName){
                setSuccess(user_name, "success")
                break
            }
            else{
                setError(user_name, "invalid username")
            }
        }
    })
}


function password_validation() {
    if(password.value.trim()==''){
        setError(password, 'Password can not be empty');
    }else if(password.value.trim().length <6 || password.value.trim().length >20){
        setError(password, 'Password min 6 max 20 charecters');
    }else {
        setSuccess(password, "success");
    }

    onValue(users_in_db, function(snapshort) {
        let users_array = Object.values(snapshort.val())
        let password_value = password.value

        for (let i = 0; i < users_array.length; i++) {
            let current_user = users_array[i]
            console.log(current_user)
            console.log(password_value, current_user.password)
            if(password_value == current_user.password){
                setSuccess(password, "success")
                break
            }
            else{
                setError(password, "invalid password")
            }
        }
    })
}

function formValidation(){
    username_validation()
    password_validation()
    get_data_form_db()
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


function get_data_form_db(){
    onValue(users_in_db, function(snapshort) {
        let users_array = Object.values(snapshort.val())
        console.log(users_array)
        let user_name_value = user_name.value
        let password_value = password.value

        for (let i = 0; i < users_array.length; i++) {
            let current_user = users_array[i]
            console.log(current_user)
            console.log(user_name_value, current_user.userName)
            console.log(password_value, current_user.password)
            if(user_name_value == current_user.userName && password_value == current_user.password){
                setSuccess(user_name, "success")
                setSuccess(password, "success")
            }
            else{
                setError(user_name, "invalid username or")
                setError(password, "invalid password")
            }
        }
    })
}