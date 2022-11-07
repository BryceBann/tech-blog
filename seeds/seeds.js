const seedUsers = require('./user');
const seedComments = require('./comment')
const seedPosts = require('./post');

const sequelize = require('../config/connection');


const seedAll = async() => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();
    await seedComments();
    process.exit();
};

seedAll();