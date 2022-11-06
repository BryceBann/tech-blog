const seedUsers = require('./user');
const seedComments = require('./comment')

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedComments();
    process.exit();
};

seedAll();