const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const notes = require("./routes/notes");
const quickNote = require("./routes/quickNotes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/notes", notes);
app.use("/quickNote", quickNote);

const client_red = require("./config/redisClient");

const dbConnData = {
    host: process.env.MONGO_HOST || "127.0.0.1",
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DATABASE || "local"
};

client_red.on("connect", () => {
    console.log(`Connected to Redis.`);
    mongoose
        .connect(
            `mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        .then(async (response) => {
            console.log(
                `Connected to MongoDB. Database name: "${response.connections[0].name}"`
            );
            const port = process.env.PORT || 5000;
            app.listen(port, () => {
                console.log(`API server listening on port ${port}`);
            });
        })
        .catch((error) => console.error("Error connecting to MongoDB", error));
});
client_red.on("error", (err) => {
    console.error("Error connecting to Redis", err);
});
