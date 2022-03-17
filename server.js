require("dotenv").config();
const express = require("express");
const compression = require("compression");
const security = require(__dirname + "/security.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const content = require("./contentManager.js");

const app = express();

app.listen("1788", () => {
	console.log("Server started at port 1788");
});
// app.use(compression());
app.use(express.static(__dirname + "/public"));
app.use(cookieParser(process.env.COOKIEKEY));
app.use(session({
	secret: process.env.COOKIEKEY,
	resave: false,
	saveUninitialized: true
}));
app.use(express.urlencoded({limit: "50mb", extended: true}));
app.use(express.json({limit: "50mb", extended: true}));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/views/index.html");
});

app.get("/canvas", (req, res) => {
	res.sendFile(__dirname + "/public/views/components/canvas.html")
});

app.get("/methodtest", (req, res) => {
	res.sendFile(__dirname + "/public/views/methodtest.html")
});

app.get("/login", (req,res) => {
	if (req.cookies.isAuthenticated == "true"){
		res.redirect("/console");
	} else if (req.session.isAuthenticated == true) {
		res.redirect("/console");
	} else {
		res.sendFile(__dirname + "/public/views/auth.html");
	}
});

app.get("/console", (req, res) => {
	if (req.cookies.isAuthenticated == "true"){
		res.sendFile(__dirname + "/public/views/console.html");
	} else if (req.session.isAuthenticated == true) {
		res.sendFile(__dirname + "/public/views/console.html");
	} else {
		res.redirect("/login");
	}
});

app.get("/api/username", (req, res) => {
	if (req.cookies.isAuthenticated == "true"){
		res.send(JSON.stringify({username:req.cookies.username}));
	} else if (req.session.isAuthenticated) {
		res.send(JSON.stringify({username:req.session.username}));
	} else {
		res.send(JSON.stringify({username:"Not authenticated"}));
	}
});

app.post("/api/authenticate", (req, res) => {
	if (!req.body.email || !req.body.password){
		res.send("Error, no E-mail nor Password field were sent, check formating!");
	} else {
		security.authenticate(req.body.email, req.body.password, (success, err) => {
			if (!err) {
				if (req.body.cookies == true){
					res.cookie("isAuthenticated", "true", {maxAge: 14 * 60 * 60 * 24 * 1000, httpOnly: false});
					res.cookie("username", req.body.email, {maxAge: 14 * 60 * 60 * 24 * 1000, httpOnly: false}).send("Ok");
				} else {
					req.session.isAuthenticated = true;
					req.session.username = req.body.email;
					res.send("Ok");
				}
			} else {
				res.send(err);
			}
		});
	}
});

app.get("/projects", (req, res) => {
	content.getProjects((projects) => {
		console.log(projects);
		res.send(JSON.stringify({projects: projects}));
	});
});

app.post("/projects", (req, res) => {
	content.updateProjects(req.body.project, (proceessed) => {
		res.send(proceessed);
	});
});

app.put("/projects", (req, res) => {
	content.updateProjects(req.body.project, (proceessed) => {
		res.send(proceessed);
	});
});

app.delete("/projects", (req, res) => {
	content.deleteProjects(req.body.project, (proceessed) => {
		res.send(proceessed);
	});
});

app.get("/canvas", (req, res) => {
	res.sendFile(__dirname + "/public/views/components/canvas.html");
});
