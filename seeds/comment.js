const {Comment} = require('../models');

const commentData = 

    {
        comment_text: 'aye yoooo',
        user_id: 1,
        post_id: 1
    }


const seedComments = () => Comment.create(commentData);

module.exports = seedComments;