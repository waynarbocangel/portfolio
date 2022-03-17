require("dotenv").config();
const admin = require("./security.js").admin;

const database = admin.firestore();

function getProjects(callback) {
    database.collection("projects").get().then(collection => {
        let projects = [];
        if (!collection.empty){
            collection.forEach(doc => {
                projects.push(doc.data());
            });
        }
        callback(projects);
    });
}

function updateProjects(project, callback) {
    console.log(project);
    database.collection("projects").doc(project.id).set(project).then(response => {
        console.log(response);
        callback("Ok");
    });
}

function deleteProjects(project, callback) {
    database.collection("projects").doc(project.id).delete().then(response => {
        callback("Ok");
    });
}

module.exports = {
    getProjects: getProjects,
    updateProjects: updateProjects,
    deleteProjects: deleteProjects
}
