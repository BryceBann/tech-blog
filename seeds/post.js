const { Post } = require('../models');

const postData = [{
        title: 'why wont this page work',
        textBody: 'The amount of time was very not cool ',
        user_id: 1

    },
    {
        title: 'Boooooooo',
        textBody: 'i wanna cry',
        user_id: 2
    },
    {
        title: 'Like a whole river',
        textBody: 'what is going on with this shit',
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
