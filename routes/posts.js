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
            res.json({success: false, msg: err._message });
        } else {
            res.json({success: true, msg: 'Post successfully added'});
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
            res.json({success: false, msg: err._message });
        } else {
            res.json({success: true, msg: 'Post successfully deleted'});
        }
    });
});

router.post('/edit/:id', (req, res, next) => {
    Post.updateOne({ _id: req.params.id}, { content: req.body.content }, (err, obj) => {
        if (err) {
            res.json({success: false, msg: err._message });
        } else {
            res.json({success: true, msg: 'Post successfully edited'});
        }
    });
});

module.exports = router;
