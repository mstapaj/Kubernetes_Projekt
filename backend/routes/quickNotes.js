const express = require("express");
const router = express.Router();
const client = require("../config/redisClient");

router.get("/", async (req, res) => {
    try {
        const data = await client.get("quickNote");
        res.status(200).send({ quickNote: data });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post("/addQuickNote", async (req, res) => {
    try {
        const data = req.body;
        client.set("quickNote", data.content);
        res.status(200).send({ quickNote: data });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.put("/editQuickNote", async (req, res) => {
    try {
        const data = req.body;
        client.set("quickNote", data.content);
        res.status(200).send({ quickNote: data });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.delete("/deleteQuickNote", async (req, res) => {
    try {
        await client.del("quickNote");
        res.status(200).send("Deleted");
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;
