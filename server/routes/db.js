const router = require("express").Router();
const Message = require("../model/Message");

Message.watch().on("change", (change) => {
	console.log("Something has changed");
	console.log(change);
});
router.get("/get_messages", async (req, res) => {
	let messages = await Message.find({});
	res.json({
		messages: messages,
		message: "Successfully retrieved all of the messages.",
	});
});
router.get("/", async (req, res) => {
	res.json({ message: "Base route for the db route." });
});
module.exports.router = router;
