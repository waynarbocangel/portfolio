import { updateProjects } from "../../model/projectManager.js";
import { Link } from "./linkItem.js";
import { ProjectCard } from "./projectCard.js";

 let template = document.createElement("template");
template.innerHTML = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
        #container{
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.3);
            margin: 0;
            padding: 0;
            position: fixed;
            top: 0;
            left: 0;
        }

        #post {
            position: fixed;
            background-color: white;
            top: 10vh;
            left: calc(50vw - (80vh * (8.5 / 22)));
            border-radius: 20px;
            overflow-x: hidden;
            overflow-y: auto;
            width: calc(80vh * (8.5 / 11));
            height: 80vh;
            color: black;
            font-family: "Nunito", sans-serif;
        }

        header{
            position: relative;
            z-index: 1;
        }

        main {
            position: relative;
            z-index: 1;
        }

        nav{
            position: fixed;
            top: calc(10vh + 25px);
            left: calc(50vw - (80vh * (8.5 / 22)) + 25px);
            right: calc(50vw - (80vh * (8.5 / 22)) + 25px);
        }

        nav button{
            font-size: 18px;
            border: none;
            color: white;
            background-color: rgba(0, 0, 0, 0.4);
            border-radius: 5px;
            z-index: 2;
            cursor: pointer;
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
            height: 17vh;
            z-index: 1;
            object-fit: cover;
        }

        #post header img:hover + button{
            opacity: 1;
            transition: 100ms ease-in-out;
        }

        #uploadImage{
            position: absolute;
            font-size: 14px;
            border: none;
            color: white;
            background-color: rgba(70, 70, 70, 0.4);
            border-radius: 5px;
            right: 25px;
            padding: 5px 20px;
            top: calc(17vh - 45px);
            cursor: pointer;
            z-index: 5;
            opacity: 0;
            transition: 100ms ease-in-out;
        }

        #uploadImage:hover {
            opacity: 1;
            transition: 100ms ease-in-out;
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

        #post main{
            margin: 0 30px;
        }

        #post main hr{
            margin-top: 20px;
        }

        #post main > p {
            text-align: justify;
            font-size: 18px;
            line-height: 30px;
            margin-bottom: 20px;
        }

        #post main > p:empty:not(:focus):before{
            content:attr(placeholder);
            opacity: 0.4;
            cursor: text;
        }

        #metadata{
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
        }

        #metadata h3 {
            margin: 0 0 10px 0;
            font-size: 17px;
        }

        #metadata p {
            width: calc(100% - 150px);
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

        #linkAdd {
            font-size: 14px;
            border: none;
            color: white;
            background-color: rgba(70, 70, 70, 0.9);
            border-radius: 5px;
            padding: 5px 20px;
            opacity: 0.4;
            transition: 100ms ease-in-out;
        }

        #linkAdd:hover{
            opacity: 1;
            transition: 100ms ease-in-out;
        }

        @media (max-width: 640px) {
            #post {
                top: 2vh;
                left: 0;
                margin: 0 auto;
                width: 100vw;
                height: 98vh;
            }

            nav{
                top: calc(2vh + 25px);
                left: 25px;
                right: 25px;
            }

        }
    </style>
    <section id="container">
        <div id="post">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <header>
                <nav>
                    <button id="dismiss">&#215;</button>
                    <button id="edit">Edit</button>
                </nav>
                <img src="./resources/sandtexture.png" alt="project image">
                <button id="uploadImage">Upload Image</button>
                <h1 placeholder="Type a Project Title"></h1>
            </header>
            <main>
                <section id="metadata">
                    <h3>Published: </h3>
                    <p id="published">@Today</p>
                    <h3>Last Updated: </h3>
                    <p id="updated">@Today</p>
                    <h3>Links: </h3>
                    <div id="links"><button class="linkSection" id="linkAdd">Add</button></div>
                </section>
                <hr>
                <p id="description" placeholder="Write a description for the project"></p>
            </main>
        </div>
    </section>
`;

export class Project extends HTMLElement{
    constructor(project, mode, by, editable, container){
        super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.dismissButton = this.shadowRoot.getElementById("dismiss");
        this.editButton = this.shadowRoot.getElementById("edit");
        this.uploadImageButton = this.shadowRoot.getElementById("uploadImage");
        this.coverImage = this.shadowRoot.querySelector("img");
        this.projectTitle = this.shadowRoot.querySelector("h1");
        this.published = this.shadowRoot.getElementById("published");
        this.updated = this.shadowRoot.getElementById("updated");
        this.linkArray = this.shadowRoot.getElementById("links");
        this.linkAddButton = this.shadowRoot.getElementById("linkAdd");
        this.description = this.shadowRoot.getElementById("description");
        this.project = project;
        this.newlinks = [];
        this.card = by;
        this.projectsContainer = container;
        if (project) {
            this.project.links.forEach(link => {
                let newLink = new Link(link, mode, this);
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
            if (mode != "editing"){
                this.updated.innerHTML = project.updated;
                this.uploadImageButton.style.display = "none";
                this.projectTitle.toggleAttribute("contenteditable", false);
                this.description.toggleAttribute("contenteditable", false);
                this.description.setAttribute("placeholder", "No description");
                this.linkAddButton.parentElement.removeChild(this.linkAddButton);
                this.dismissButton.innerHTML = "&#215;";
                this.editButton.innerHTML = "Edit";
                if (!editable) {
                    this.editButton.style.display = "none";
                }
            } else {
                this.updated.innerHTML = "@Today";
                this.uploadImageButton.style.display = "block";
                this.projectTitle.toggleAttribute("contenteditable", true);
                this.description.toggleAttribute("contenteditable", true);
                this.dismissButton.innerHTML = "Cancel";
                this.editButton.innerHTML = "Done";
            }
        } else if (mode == "editing"){
            this.project = {
                id: makeid(),
                title: "",
                published: "",
                updated: "",
                description: "",
                coverType: "image/png",
                coverData: "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",
                links: []
            };
            this.uploadImageButton.style.display = "block";
            this.projectTitle.toggleAttribute("contenteditable", true);
            this.description.toggleAttribute("contenteditable", true);
            this.dismissButton.innerHTML = "&#215;";
            this.editButton.innerHTML = "Done";
        } 
    }
    connectedCallback(){

        this.resize = () => {
            let height = window.innerHeight - (window.innerHeight * 0.02);
            if (window.innerWidth <= 640){
                this.shadowRoot.getElementById("post").style.height = height + "px";
            } else {
                this.shadowRoot.getElementById("post").style.height = "80vh";
            }
            
        }

        this.startEditing = () => {
            this.updated.innerHTML = "@Today";
            this.uploadImageButton.style.display = "block";
            this.projectTitle.toggleAttribute("contenteditable", true);
            this.description.toggleAttribute("contenteditable", true);
            this.dismissButton.innerHTML = "Cancel";
            this.editButton.innerHTML = "Done";
            console.log(this.linkArray.childNodes);
            this.linkArray.childNodes.forEach(linkObject => {
                linkObject.beginEditing();
            });
            this.linkArray.appendChild(this.linkAddButton);
        }

        this.stopEditing = (save) => {
            this.uploadImageButton.style.display = "none";
            this.projectTitle.toggleAttribute("contenteditable", false);
            this.description.toggleAttribute("contenteditable", false);
            this.dismissButton.innerHTML = "&#215;";
            this.editButton.innerHTML = "Edit";
            console.log(save);
            console.log(this.card);
            if (!save){
                this.projectTitle.innerHTML = this.project.title;
                this.published.innerHTML = this.project.published;
                this.updated.innerHTML = this.project.updated;
                this.description.innerHTML = this.project.description;
                this.coverImage.src = `data:${this.project.coverType};base64,${this.project.coverData}`;
                let count = 0;
                while (count < this.linkArray.children.length){
                    this.linkArray.removeChild(this.linkArray.childNodes[0]);
                }
                this.project.links.forEach(link => {
                    let newLink = new Link(link, "false", this);
                    newLink.classList.add("linkSection");
                    this.linkArray.appendChild(newLink);
                });
            } else {
                this.project.title = this.projectTitle.innerHTML;
                this.project.coverType = this.coverType;
                this.project.coverData = this.coverData;
                this.project.links = this.newlinks;
                let currentDate = new Date();
                let dateString = [currentDate.getFullYear(), (currentDate.getMonth() + 1).toString().padStart(2, '0'), (currentDate.getDate() + 1).toString().padStart(2, '0')].join("/");
                this.project.updated = dateString;
                this.updated.innerHTML = dateString;
                this.project.description = this.description.innerHTML;
                this.linkArray.removeChild(this.linkAddButton);
                this.linkArray.childNodes.forEach(linkObject => {
                    linkObject.endEditing();
                });

                if (this.card == null) {
                    this.published.innerHTML = dateString;
                    this.project.published = dateString;
                    updateProjects({project: this.project}, "POST", (success) => {
                        this.card = new ProjectCard(this.project, "editing");
                        console.log(this.projectsContainer);
                        if (this.projectsContainer.children.length > 0){
                            this.projectsContainer.insertBefore(this.card, this.projectsContainer.childNodes[0]);
                        } else {
                            this.projectsContainer.appendChild(this.card);
                        }  
                    });
                } else {
                    updateProjects({project: this.project}, "PUT", (success) => {
                        this.card.update(this.project); 
                    });
                }
            }
        }

        this.removeLink = (deleteLink) => {
            let count = 0;
            while (count < this.project.links.length){
                if (this.project.links[count].name == deleteLink.name && this.project.links[count].address == deleteLink.address){
                    this.project.links.splice(count, 1);
                    break;
                }
                count += 1;
            }
        }

        this.linkAddButton.onclick = () => {
            let linkName = prompt("Where are you linking to?");
            let linkAddress = prompt("What is the url?");
            linkName = DOMPurify.sanitize(linkName);
            linkAddress = DOMPurify.sanitize(linkAddress);
            this.newlinks.push({name: linkName, address: linkAddress});
            let newLink = new Link({name: linkName, address: linkAddress}, "editing", this);
            newLink.classList.add("linkSection");
            this.linkArray.insertBefore(newLink, this.linkAddButton);
        }
        
        this.dismissButton.onclick = () => {
            if (this.dismissButton.innerHTML == "Cancel") {
                this.stopEditing(false);
            } else {
                console.log(this.card);
                if (this.card) {
                    this.card.update(this.project);
                }
                this.parentElement.removeChild(this);
            }
        }

        this.editButton.onclick = () => {
            if (this.editButton.innerHTML == "Done"){
                if (this.projectTitle.innerHTML == "" || !this.projectTitle.innerHTML){
                    alert("You need a title");
                } else {
                    this.stopEditing(true);
                }
            } else {
                this.startEditing();
            }
        }

        this.uploadImageButton.onclick = () => {
            let input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/png, image/gif, image/jpeg, image/wpeg");
            input.click();
            input.onchange = () => {
                if (input.files.length == 1){
                    if (input.files[0].size > 1048576) {
                        alert("The file is too big. Max size 1MB");
                    } else {
                        this.coverType = input.files[0].type;
                        let base64 = "";
                        input.files[0].arrayBuffer().then(array => {
                            let bytes = new Uint8Array(array);
                            for (let i = 0; i < bytes.byteLength; i++) {
                                base64 += String.fromCharCode(bytes[i]);
                            }
                            base64 = window.btoa(base64);
                            this.coverData = base64;
                            this.coverImage.src = `data:${this.coverType};base64,${this.coverData}`;
                        });
                    }
                }
            };
        };

        window.addEventListener("resize", () => {
            this.resize();
        });
        
        document.addEventListener("DOMContentLoaded", () => {
            this.resize();
        });
    }
};

function makeid () {
	let length = 30;
    let result = [];
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join("");
}

customElements.define('project-blog', Project);
