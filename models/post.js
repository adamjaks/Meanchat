const mongoose = require('mongoose');
const config = require('../config/database');

const PostSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    creator_id: {
        type: String,
        required: true
    },
    creator_name: {
        type: String,
        required: true
    },
    post_date: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    }
});

const Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.addPost = function(newPost, callback) {
    newPost.save(callback);
};
