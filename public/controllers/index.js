import {loadProjects} from "../model/projectManager.js";
import *  as cookies from "../model/cookieFunctions.js";
loadProjects();

let projectCards = document.getElementById("projectCards");
let copyRight = document.getElementById("copyRight");

if (cookies.getCookie("isAuthenticated") == "true"){
    document.querySelector("#logIn a").innerHTML = "Console";
} else if (cookies.getCookie("connect.sid") != null){
    fetch("/api/username").then(response => response.json()).then(data => {
        if (data.username == "Not authenticated"){
            document.querySelector("#logIn a").innerHTML = "Log In";
        } else {
            document.querySelector("#logIn a").innerHTML = "Console";
        }
    })
} else {
    document.querySelector("#logIn a").innerHTML = "Log In";
}

loadProjects(projectCards, "False");

copyRight.innerHTML = `&#169; Waynar Bocangel Calderon - ${(new Date()).getFullYear()}`;



