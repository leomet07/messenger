const router = require("express").Router();
const Message = require("../model/Message");

router.get("/get_messages", handle_get_messages_request);
router.post("/get_messages", handle_get_messages_request);

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
async function handle_get_messages_request(req, res, next) {
	let messages = await get_messages(req.body);
	res.json({
		messages: messages,
		description: "Successfully retrieved all of the messages.",
	});
}
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

async function update_all() {
	const io = require("../index").io;

	const rooms = Array.from(io.sockets.adapter.rooms.keys());

	for (let i = 0; i < rooms.length; i++) {
		const room = rooms[i];
		if (room.length > 15) {
			// If long room id, then it is the default room joined with the room tag being the socket id
			continue;
		}
		const messages_room = await get_messages({ room });

		io.to(room).emit("all_messages", messages_room);
	}
}

Message.watch().on("change", async (change) => {
	const io = require("../index").io;
	console.log("Something has changed", change);
	if (change.operationType == "insert") {
		io.to(change.fullDocument.room).emit(
			"new_message",
			change.fullDocument
		);
	}
});

router.get("/", async (req, res) => {
	res.json({ message: "Base route for the db route." });
});
module.exports = { router, get_messages, create_message };

setInterval(update_all, 1000);
