const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
	text: {
		type: String,
	},
});

const messageSchemafordb = mongoose.model("Message", messageSchema);

module.exports = messageSchemafordb;
