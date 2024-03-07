const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;
const users = [];
const generateID = () => Math.random().toString(36).substring(2, 10);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/api/register", async (req, res) => {
    const { email, password, username } = req.body;
    //holds the ID
    const id = generateID();
    //logs all the user's credentials to the console.
    console.log({ email, password, username, id });
});

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});