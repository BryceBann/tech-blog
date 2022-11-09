const { Comment } = require('../models');

const commentData = [{
        comment_text: "i ahte it here",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "wanna go home",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "oh wait im home",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;