import { Link } from "./linkItem.js";
import {openProject, updateProjects, removeProject} from "../../model/projectManager.js";

let template = document.createElement("template");
template.innerHTML = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        #post {
            background-color: white;
            border-radius: 20px;
            overflow-x: hidden;
            overflow-y: auto;
            width: calc(550px * (8.5 / 11));
            height: 550px;
            color: black;
            font-family: "Nunito", sans-serif;
            box-shadow: 1px 0 10px 0 #777777;
        }

        header{
            position: relative;
            z-index: 1;
        }

        main {
            position: relative;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: space-between;
            z-index: 1;
            margin: 0 30px;
            height: calc(550px - 26.364px - 150px - 47.727px - 58.1px);
            overflow: hidden;
        }

        main > *{
            flex-basis: content;
            flex-grow: 0;
        }

        #dismiss{
            padding: 5px 10px;
        }

        #edit{
            position: absolute;
            top: 0;
            right: 0;
            padding: 5px 20px;
        }

        #post header img {
            text-align: center;
            width: 100%;
            height: 150px;
            z-index: 1;
            object-fit: cover;
        }

        #post header img:hover + button{
            opacity: 1;
            transition: 100ms ease-in-out;
        }

        #actions {
            width: 100%;
            text-align: center;
            flex-shrink: 0;
        }

        #actions button{
            font-size: 14px;
            border: none;
            color: white;
            width: 80px;
            background-color: rgba(7, 7, 7, 0.4);
            border-radius: 5px;
            margin: 0 10px;
            padding: 5px 20px;
            cursor: pointer;
            z-index: 15;
            opacity: 0.8;
            transition: 100ms ease-in-out;
        }

        #actions button:hover {
            opacity: 1;
            transition: 100ms ease-in-out;
        }

        #delete {
            background-color: rgba(243, 68, 19, 0.8) !important;
        }
        
        #post header h1{
            font-size: 35px;
            text-align: center;
        }

        #post header h1:empty:not(:focus):before{
            content:attr(placeholder);
            opacity: 0.4;
            cursor: text;
        }

        #post main hr{
            width: 100%;
            height: 1px;
            flex-grow: 0;
        }

        #descriptionContainer{
            position: relative;
            flex-shrink: 7;
            flex-basis: 0 !important;
            flex-grow: 1 !important;
            min-height: 0;
            margin-bottom: 20px;
        }

        #descriptionContainer > p {
            position: relative;
            text-align: justify;
            font-size: 18px;
            line-height: 31.6px;
            margin: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            max-height: calc(100%);
        }

        #descriptionContainer > p:not(:empty)::before{
            content: "...";
            position: absolute;
            bottom: 0;
            right: 0;
            width: 18px;
            height: 2rem;
            background: white;
        }

        #descriptionContainer > p:not(:empty)::after{
            content: "";
            position: absolute;
            right: 0;
            width: 18px;
            height: 2rem;
            background: white;
        }

        #descriptionContainer > p:empty:not(:focus):before{
            content:attr(placeholder);
            opacity: 0.4;
            cursor: text;
        }

        #metadata{
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            flex-shrink: 0;
        }

        #metadata h3 {
            margin: 0 0 10px 0;
            font-size: 17px;
        }

        #metadata p {
            padding-right: calc(100% - 250px);
            margin: 0 0 10px 10px;
            font-style: italic;
        }

        #metadata div{
            width: calc(100% - 60.064px);
            margin: 0 0 0 10px;
            overflow-wrap: break-word;
        }

        .linkSection{
            margin: 5px 2.5px;
            cursor: pointer;
            max-width: 100%;
            z-index: 5;
            display: inline-block;
        }
    </style>
    <section id="post">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <header>
            <img src="./resources/sandtexture.png" alt="project image">
            <h1 placeholder="Type a Project Title"></h1>
        </header>
        <main>
            <section id="metadata">
                <h3>Published: </h3>
                <p id="published">@Today</p>
                <h3>Last Updated: </h3>
                <p id="updated">@Today</p>
                <h3>Links: </h3>
                <div id="links"></div>
            </section>
            <hr>
            <div id="descriptionContainer">
                <p id="description" placeholder="No description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro est facilis numquam recusandae corrupti nemo. Nesciunt accusantium ullam quidem totam culpa sequi fugit, voluptatem explicabo recusandae debitis eius nam illo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi facilis earum culpa at perferendis natus consectetur nihil temporibus repudiandae, incidunt tempora quod, labore optio nostrum quidem architecto molestias laboriosam voluptate! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut ipsam perferendis velit? Pariatur obcaecati, eum, provident in adipisci saepe illo quod corporis minima quibusdam voluptate rem accusantium accusamus repudiandae deleniti.</p>
            </div>
                
            <div id="actions">
                <button id="more">More</button>
                <button id="delete">Delete</button>
            </div>
        </main>
    </section>
`;

export class ProjectCard extends HTMLElement{
    constructor(project, mode){
        super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.deleteButton = this.shadowRoot.getElementById("delete");
        this.moreButton = this.shadowRoot.getElementById("more");
        this.coverImage = this.shadowRoot.querySelector("img");
        this.projectTitle = this.shadowRoot.querySelector("h1");
        this.published = this.shadowRoot.getElementById("published");
        this.updated = this.shadowRoot.getElementById("updated");
        this.linkArray = this.shadowRoot.getElementById("links");
        this.description = this.shadowRoot.getElementById("description");
        this.project = project;
        this.newlinks = [];
        if (project) {
            this.project.links.forEach(link => {
                let newLink = new Link(link, "false", this);
                newLink.classList.add("linkSection");
                this.linkArray.insertBefore(newLink,this.linkAddButton);
            });
            this.projectTitle.innerHTML = project.title;
            this.published.innerHTML = project.published;
            this.description.innerHTML = project.description;
            this.coverType = project.coverType;
            this.coverData = project.coverData;
            this.coverImage.src = `data:${project.coverType};base64,${project.coverData}`;
            this.newlinks = Array.from(this.project.links);
            this.updated.innerHTML = project.updated;
            if (mode != "editing"){
                this.deleteButton.style.display = "none";
                this.moreButton.innerHTML = "More";
            } else {
                this.deleteButton.style.display = "inline-block";
                this.moreButton.innerHTML = "Edit";
            }
        } else if (mode == "editing"){
            this.deleteButton.style.display = "inline-block";
            this.moreButton.innerHTML = "Edit";
        } else {
            this.deleteButton.style.display = "none";
            this.moreButton.innerHTML = "More";
        }

    }
    connectedCallback(){

        this.openProject = (editing) => {
            openProject(this.project, document.body, this, editing);
        }
        
        this.deleteButton.onclick = () => {
            console.log("should delete");
            updateProjects({project: this.project}, "DELETE", (success) => {
                if (success) {
                    removeProject(this.project, this.parentElement);
                }
            });
        }

        this.update = (project) => {
            updateProjects({project: project}, "PUT", (success) => {
                if (success) {
                    while (0 < this.linkArray.children.length) {
                        this.linkArray.removeChild(this.linkArray.childNodes[0]);
                    }
                    this.project.links.forEach(link => {
                        let newLink = new Link(link, "false", this);
                        newLink.classList.add("linkSection");
                        this.linkArray.insertBefore(newLink,this.linkAddButton);
                    });
                    this.projectTitle.innerHTML = project.title;
                    this.published.innerHTML = project.published;
                    this.description.innerHTML = project.description;
                    this.coverType = project.coverType;
                    this.coverData = project.coverData;
                    this.coverImage.src = `data:${project.coverType};base64,${project.coverData}`;
                    this.newlinks = Array.from(this.project.links);
                    this.updated.innerHTML = project.updated;
                }
            });
        }

        this.moreButton.onclick = () => {
            if (this.moreButton.innerHTML == "More"){
                this.openProject("false");
            } else {
                this.openProject("editing");
            }
        }
    }
};

customElements.define('project-card', ProjectCard);
