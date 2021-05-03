const router = require("express").Router();

router.get("/", async (req, res) => {
	res.json({ message: "Base route for the api route." });
});
module.exports.router = router;
