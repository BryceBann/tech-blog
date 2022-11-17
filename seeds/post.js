const { Post } = require('../models');

const postData = [{
        title: 'why is tech so hard',
        post_body: 'because it always changes',
        user_id: 1

    },
    {
        title: 'new update already ',
        post_body: 'see the new changes',
        user_id: 2
    },
    {
        title: 'cherry keyboards are now in',
        post_body: 'with all the fast typing and loud clicks',
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
