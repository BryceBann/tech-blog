const seedUsers = require('./user');
const seedComments = require('./coment')

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedComments();
    process.exit(0);
};

seedAll();