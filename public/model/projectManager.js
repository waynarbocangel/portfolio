import {Project} from "../views/components/project.js";
import { ProjectCard } from "../views/components/projectCard.js";

let projects = [];

export let loadProjects = (inside, mode) => {
    /**
     * @type Array<Object>
     */
    fetch("/projects").then(data => data.json()).then((data) => {
        if (data.error){
            alert("There was an error connecting to the server. The projects could not be loaded.");
        } else {
            projects = data.projects;
            loadContainer(inside, mode);
        }
    });
};

export let openProject = (project, inside, by, mode, container) => {
    let newProject = new Project(project, mode, by, (mode == "editing"), container);
    inside.appendChild(newProject);
};

export let updateProjects = (update, method, callback) => {
    console.log(update);
    let request = new XMLHttpRequest();
    request.open(method, "/projects", true);
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
    request.send(JSON.stringify(update));
};

/**
 * 
 * @param {HTMLElement} inside 
 */
export let removeProject = (project, inside) => {
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id = project.id){
            projects.splice(i, 1);
            break;
        }
    }

    for (let i = 0; i < inside.children.length; i++) {
        if (inside.childNodes[i].project.id = project.id){
            inside.removeChild(inside.childNodes[i]);
            break;
        }
    }
};

/**
 * 
 * @param {HTMLElement} inside 
 */
export let addProject = (project, inside, mode) => {
    projects.push(project);
    inside.appendChild(new ProjectCard (project, mode));
};

/**
 * 
 * @param {HTMLElement} inside 
 */
let loadContainer = (inside, mode) => {
    let count = 0;
    while(count < inside.children.length) {
        inside.removeChild(inside.childNodes[count]);
    }
    projects.forEach(project => {
        inside.appendChild(new ProjectCard (project, mode));
    });
}
