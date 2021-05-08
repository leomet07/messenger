const db = require("../db");
async function handleuser(user, io) {
	console.log("user connected, handled in handlers file");

	user.on("disconnect", () => {
		console.log("user disconnected");
	});

	user.on("create_message", async (data) => {
		console.log("create message handler file", data);
		let saved_message = await db.create_message(data);
	});
}

console.log("Ran main handlers file.");

module.exports = {
	handleuser: handleuser,
};
