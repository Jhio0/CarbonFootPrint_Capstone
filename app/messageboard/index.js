const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

//Swapping to Firebase

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Test",
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.post("/api/create/thread", async (req, res) => {
    const { thread, userId } = req.body;
    const threadId = generateID();

    console.log({ thread, userId, threadId });
});