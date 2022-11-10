const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});


module.exports = { User, Post, Comment };