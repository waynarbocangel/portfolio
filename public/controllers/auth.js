import *  as cookies from "../model/cookieFunctions.js";

let email = document.getElementById("email");
let password = document.getElementById("password");
let loginButton = document.getElementById("login");


function validateInput (email, password){
    if (email == "" || !email || password == "" || !password){
        alert("You need to fill in both the e-mail and password fields!");
        return false;
    } else {
        if (!(email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i))){
            alert("Please enter a valid e-mail address");
            return false;
        } else {
            return true;
        }
    }
}

function authenticate(email, password, callback){
    let user = {email: email, password: password, cookies: cookies.isEnabled()};
    let request = new XMLHttpRequest();
    request.open("POST", "/api/authenticate", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE){
            if (request.status == 200 && request.responseText == "Ok"){
                callback(true);
            } else {
                if (request.status == 200){
                    alert(request.responseText);
                } else {
                    alert("Something went wrong, try again later!");
                }
                callback(false);
            }
        } 
    };
    request.send(JSON.stringify(user));
}

loginButton.onclick = (e) => {
    e.preventDefault();
    if (validateInput(email.value, password.value)){
        authenticate(email.value, password.value, (success) => {
            if (success){
                console.log("hello");
                window.location.href = "./console";
            }
        });
    }
};
