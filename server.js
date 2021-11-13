const express = require("express");
const app = express();

app.listen("1788", () => {
	console.log("Server started at port 1788");
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/views/index.html");
});
