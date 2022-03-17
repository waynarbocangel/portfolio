let formId = document.getElementById("formId");
let formName = document.getElementById("name");
let formBody = document.getElementById("body");
let formDate = document.getElementById("date");
let postButton = document.getElementById("post");
let getButton = document.getElementById("get");
let putButton = document.getElementById("put");
let deleteButton = document.getElementById("delete");
let output = document.querySelector("output");
let currentDateString = () => {
    let currentDate = new Date();
    return [currentDate.getFullYear(), (currentDate.getMonth() + 1).toString().padStart(2, '0'), (currentDate.getDate()).toString().padStart(2, '0')].join("-");
};
formDate.value = currentDateString();
console.log(currentDateString());

postButton.onclick = (e) => {
    e.preventDefault();
    let request = new XMLHttpRequest();
    request.open("POST", "https://httpbin.org/post", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE){
            if (request.status == 200){
                console.log(request.responseText);
                output.innerHTML = JSON.stringify(JSON.parse(request.responseText), null, 2);
            } else {
                console.log("needs work");
            }
        } 
    };
    request.send(JSON.stringify({id: formId.value, article_name: formName.value, article_body: formBody, date: currentDateString()}));
}

getButton.onclick = (e) => {
    e.preventDefault();
    let request = new XMLHttpRequest();
    request.open("GET", "https://httpbin.org/get", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE){
            if (request.status == 200){
                console.log(request.responseText);
                output.innerHTML = JSON.stringify(JSON.parse(request.responseText), null, 2);
            } else {
                console.log("needs work");
            }
        } 
    };
    request.send(JSON.stringify({id: formId.value, article_name: formName.value, article_body: formBody, date: currentDateString()}));
}

putButton.onclick = (e) => {
    e.preventDefault();
    let request = new XMLHttpRequest();
    request.open("PUT", "https://httpbin.org/put", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE){
            if (request.status == 200){
                console.log(request.responseText);
                output.innerHTML = JSON.stringify(JSON.parse(request.responseText), null, 2);
            } else {
                console.log("needs work");
            }
        } 
    };
    request.send(JSON.stringify({id: formId.value, article_name: formName.value, article_body: formBody, date: currentDateString()}));
}

deleteButton.onclick = (e) => {
    e.preventDefault();
    let request = new XMLHttpRequest();
    request.open("DELETE", "https://httpbin.org/delete", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE){
            if (request.status == 200){
                console.log(request.responseText);
                output.innerHTML = JSON.stringify(JSON.parse(request.responseText), null, 2);
            } else {
                console.log("needs work");
            }
        } 
    };
    request.send(JSON.stringify({id: formId.value, article_name: formName.value, article_body: formBody, date: currentDateString()}));
}
