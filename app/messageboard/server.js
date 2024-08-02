const express = require('express');
const firebaseAdmin = require('firebase-admin');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Initialize Firebase Admin SDK
// To be completed
const serviceAccount = require('./path/to/serviceAccountKey.json');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'YOUR_DATABASE_URL'
});

// Firebase Firestore instance
const firestore = firebaseAdmin.firestore();

// Route for creating a new post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    // Add the new post to Firestore
    const postRef = await firestore.collection('posts').add({
      title,
      content,
      userId,
      createdAt: new Date()
    });

    res.status(201).json({ postId: postRef.id });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});