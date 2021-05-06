const router = require("express").Router();
const Message = require("../model/Message");

router.get("/get_messages", async (req, res) => {
	let messages = await get_messages({});
	res.json({
		messages: messages,
		description: "Successfully retrieved all of the messages.",
	});
});
router.post("/create_message", async (req, res, next) => {
	try {
		const saved_message = await create_message(req.body);
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
async function create_message(query) {
	let message = await Message.create(query);
	let saved_message = await message.save();
	return saved_message;
}

async function get_messages(query) {
	return await Message.find(query);
}

Message.watch().on("change", (change) => {
	const io = require("../index").io;
	console.log("Something has changed", change);
	if (change.operationType == "insert") {
		io.emit("new_message", change.fullDocument);
	}
});
router.get("/", async (req, res) => {
	res.json({ message: "Base route for the db route." });
});
module.exports = { router, get_messages };
