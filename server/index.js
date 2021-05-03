const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const handlers = require("./routes/io/handlers");
const mongoose = require("mongoose");
const app = express();

var http = require("http").createServer(app);

const io = require("socket.io")(http, {
	cors: {
		origin: "*",
	},
});

if (process.env.dev != "true") {
	console.log("Enforcin production settings");
	app.set("trust proxy", 1);
} else {
	console.log("Production config not set for dev");
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

const db_str = process.env.DB_CONNECT;
console.log(db_str);
mongoose.connect(
	db_str,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	},
	() => {
		console.log("connected to db!");
	}
);

// import Routes
const apiRouter = require("./routes/api").router;

//Routes Middleware
app.use("/api/", apiRouter);
app.get("/", function (req, res) {
	res.send("Hello World to Server");
});

http.listen(process.env.PORT || 3000, function () {
	var host = http.address().address;
	var port = http.address().port;
	console.log("App listening at http://%s:%s", host, port);
});

io.on("connection", (client) => {
	console.log("socket connection", client);
});

module.exports.io = io;
