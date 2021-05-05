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
		description: "Successfully retrieved all of the messages.",
	});
});
router.post("/create_message", async (req, res, next) => {
	try {
		console.log(req.body);
		let message = await Message.create(req.body);
		let saved_message = await message.save();
		res.json({
			message: saved_message,
			description: "Successfully created the message.",
		});
	} catch (error) {
		next(error);
	}
});
router.delete("/delete_message/:id", async (req, res, next) => {
	try {
		await delete_message({ _id: req.params.id });
		res.json({
			description: "Deleted message with an id of " + req.params.id,
		});
	} catch (error) {
		next(error);
	}
});
router.delete("/delete_message/", async (req, res, next) => {
	try {
		await delete_message(req.body);
		res.json({
			description:
				"Deleted message with an query of " + JSON.stringify(req.body),
		});
	} catch (error) {
		next(error);
	}
});

async function delete_message(query) {
	const doesExist = await Message.findOne(query);

	if (doesExist) {
		await Message.deleteOne(query);
	} else {
		throw new Error(`Message of ${JSON.stringify(query)} does not exist`);
	}
}

router.get("/", async (req, res) => {
	res.json({ message: "Base route for the db route." });
});
module.exports.router = router;
