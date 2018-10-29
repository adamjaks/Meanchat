const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('/add', (req, res, next) => {
    let newPost = new Post({
        content: req.body.content,
        creator_id: req.body.creator_id,
        creator_name: req.body.creator_name,
        post_date: req.body.post_date,
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

router.post('/delete/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id}, (err, obj) => {
        if (err) {
            res.json({success: false, msg: `Not deleted`});
        } else {
            res.json({success: true, msg: `Deleted post with id: ${req.params.id}`});
        }
    });
});

module.exports = router;
