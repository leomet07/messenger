const router = require("express").Router();
const dbRouter = require("./db").router;
router.use("/db", dbRouter);
router.get("/", async (req, res) => {
	res.json({ description: "Base route for the api route." });
});

module.exports.router = router;
