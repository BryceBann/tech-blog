const sequelize = require('../config/connection');
const {Model, DataTypes} = require('sequelize');

class Comment extends Model {}
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment_text: {
        type: DataTypes.STRING,
        validate: {
            len: [3]
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        // allow_null: false,
        references: {
            model: 'user',
            Key: 'id'
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        references: {
            model: 'post',
            key: 'id'
        }
    }
}, 
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
});
module.exports = Comment;
    