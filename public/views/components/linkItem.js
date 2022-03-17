let template = document.createElement("template");
template.innerHTML = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
        section{
            font-family: "Nunito", sans-serif;
            width: auto;
            max-width: 100%;
            height: 26.364px;
            display: inline-flex;
            justify-content: space-between;
            border-radius: 5px;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        
        section button{
            color: white;
            border: none;
            background-color: black;
            cursor: pointer;
            padding: 0 10px;
            margin: 0;
            opacity: 0.8;
            transition: 100ms ease-in-out;
            display: none;
        }

        section button:hover{
            opacity: 0.85;
            transition: 100ms ease-in-out;
        }

        section a{
            margin: 0;
            background-color: rgba(0, 0, 0, 0.7);
            padding: 5px 10px 5px;
            font-size: 14px;
            display: inline-block;
            color: white;
            text-decoration: none;
            transition: 100ms ease-in-out;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        section a:hover {
            text-decoration: underline;
            background-color: rgba(0, 0, 0, 0.75);
            transition: 100ms ease-in-out;
        }
    </style>
    <section>
        <button>&#215;</button>
        <a href="#">Link Name</a>
    </section>
`;

export class Link extends HTMLElement{
    constructor(link, mode, parentProject){
        super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.linkTitle = this.shadowRoot.querySelector("a");
        this.deleteButton = this.shadowRoot.querySelector("button");
        this.linkObject = link;
        this.linkTitle.innerHTML = link.name;
        this.linkTitle.href = link.address;
        this.parentProject = parentProject;
        if (mode == "editing") {
            this.deleteButton.style.display = "inline-block";
        } else {
            this.deleteButton.style.display = "none";
        }
    }
    connectedCallback(){
        this.deleteButton.onclick = () => {
            this.parentProject.removeLink(this.linkObject);
            this.parentElement.removeChild(this);
        };

        this.beginEditing = () => {
            this.deleteButton.style.display = "inline-block";
        }

        this.endEditing = () => {
            this.deleteButton.style.display = "none";
        }
    }
};

customElements.define('link-item', Link);