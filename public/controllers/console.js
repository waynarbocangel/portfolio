import { loadProjects, openProject } from "../model/projectManager.js";
import *  as cookies from "../model/cookieFunctions.js";
let projectCards = document.getElementById("projectCards");
let addProject = document.getElementById("addProject");
let logOut = document.getElementById("logOut");

if (cookies.getCookie("isAuthenticated") == "true"){
    let email = document.getElementById("username");
    email.innerHTML = cookies.getCookie("username");
} else {
    fetch("/api/username").then(response => response.json()).then(data => {
        if (data.username == "Not authenticated"){
            window.location.href = "/login";
        } else {
            let email = document.getElementById("username");
            email.innerHTML = data.username;
        }
    })
}

loadProjects(projectCards, "editing");

logOut.onclick = () => {
    cookies.eraseCookie("isAuthenticated");
    cookies.eraseCookie("username");
    cookies.eraseCookie("connect.sid");
    window.location.href = "/";
}

addProject.onclick = () => {
    openProject(null, document.body, null, "editing", projectCards);
}
