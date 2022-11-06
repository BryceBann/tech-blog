const { Post } = require('../models');

const postData = [
    {
    title: 'ohhh yea',
    content: 'this is all very important',
    user_id: 1
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;