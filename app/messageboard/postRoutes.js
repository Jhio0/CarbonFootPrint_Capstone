const express = require('express');
const router = express.Router();

// Import the Post model (assuming you have defined it using Mongoose)
const Post = require('../models/Post');

// Define route for creating a new post
router.post('/posts', async (req, res) => {
  try {
    // Extract data from the request body
    const { title, content, author } = req.body;

    // Create a new post instance
    const newPost = new Post({
      title,
      content,
      author
    });

    // Save the new post to the database
    const savedPost = await newPost.save();

    // Respond with the newly created post
    res.status(201).json(savedPost);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;