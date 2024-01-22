let form = document.querySelector(".container")
let user_name = document.querySelector("#Username")
let confirm_password = document.querySelector("#confirm_password")

form.addEventListener("submit", (event) => {
    formValidation();
    if (isFormValid() == true) {
        form.submit()
    }
    else{
        event.preventDefault();
    }
})

function isFormValid(){
    let input_box = document.querySelector("#input_box")
    let result = true
    input_box.forEach((box) => {
        if (box.classList.contains("error")) {
            result = false
        }
    });
    return result
}

function formValidation(){
    // USERNAME
    if (user_name.value.trim() == "") {
        setError(user_name, "username cannot be empty")
    }
    else if(user_name.value.trim().length < 5 || user_name.value.trim().length > 20){
        setError(user_name, "username must be between 5 to 20 characters")
    }
    else{
        setSuccess(user_name, "success")
    }

    //PASSWORD
    if(password.value.trim()==''){
        setError(password, 'Password can not be empty');
    }else if(password.value.trim().length <6 || password.value.trim().length >20){
        setError(password, 'Password min 6 max 20 charecters');
    }else {
        setSuccess(password, "success");
    }
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
