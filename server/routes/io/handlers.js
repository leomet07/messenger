const db = require("../db");
async function handleuser(user, io) {
	console.log("user connected, handled in handlers file");
	const messages = await db.get_messages({});
	user.emit("inital_data", messages);
	user.on("disconnect", () => {
		console.log("user disconnected");
	});
}
console.log("Ran main handlers file.");

module.exports = {
	handleuser: handleuser,
};
