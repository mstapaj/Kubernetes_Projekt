const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    content: { type: String, maxlength: 500 },
});

module.exports = model("Note", noteSchema);
