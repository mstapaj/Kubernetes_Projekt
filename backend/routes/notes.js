const express = require("express");
const router = express.Router();

const Note = require("../models/note");

router.get("/", async (req, res) => {
    try {
        const data = await Note.find({});
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Note.findById(id);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post("/addNote", async (req, res) => {
    try {
        const data = req.body;
        const newNote = new Note({
            title: data.title,
            content: data.content,
        });
        await newNote.save();
        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.put("/editNote", async (req, res) => {
    try {
        const id = req.body._id;
        const data = req.body;
        await Note.findByIdAndUpdate(id, data);
        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.delete("/deleteNote/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await Note.findByIdAndDelete(id);
        return res.status(200).send(id);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;
