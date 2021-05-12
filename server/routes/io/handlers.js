const db = require("../db");
async function handleuser(user, io) {
	console.log("user connected, handled in handlers file");

	user.on("disconnect", () => {
		console.log("user disconnected");
	});

	// once a client has connected, we expect to get a ping from them saying what room they want to join
	user.on("room", function (room) {
		console.log("Client joined room. ID: ", room);
		user.join(room);

		user.on("create_message", async (data) => {
			console.log("create message handler file", data);
			console.log("New message in room: ", room);
			let saved_message = await db.create_message({ ...data, room });
		});
	});
}

console.log("Ran main handlers file.");

module.exports = {
	handleuser: handleuser,
};
