const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
	room: {
		type: String,
		required: true,
	},
});

const messageSchemafordb = mongoose.model("Message", messageSchema);

module.exports = messageSchemafordb;
