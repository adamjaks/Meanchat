const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('/add', (req, res, next) => {
    let newPost = new Post({
        content: req.body.content,
        creator_username: req.body.creator_username,
        rate: req.body.rate
    });

    Post.addPost(newPost, (err, post) => {
        if (err) {
            res.json({success: false, msg: `Post: ${newPost}`});
        } else {
            res.json({success: true, msg: 'Post added'});
        }
    });
});

router.get('/fetch', (req, res, next) => {
    Post.find((err, docs) => {
        res.json({ posts: docs });
    });
});

module.exports = router;
