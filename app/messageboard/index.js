"use client"
import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';

app.post("/api/create/thread", async (req, res) => {
    const { thread, userId } = req.body;
    const threadId = generateID();

    console.log({ thread, userId, threadId });
});