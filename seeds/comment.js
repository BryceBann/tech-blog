const { Comment } = require('../models');

const commentData = [{
        comment_body: "so cool",
        user_id: 1,
        post_id: 1
    },
    {
        comment_body: "big win",
        user_id: 2,
        post_id: 2
    },
    {
        comment_body: "about time",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;