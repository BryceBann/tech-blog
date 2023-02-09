const { User } = require('../models');

const userData = [{
        username: 'frank',
        email: 'frank@email.net',
        password: 'jfrank'

    },
    {
        username: 'sarah',
        email: 'sarah@email.com',
        password: 'sarah'
    },
    {
        username: 'bobby',
        email: 'bobby@email.com',
        password: 'bobby'
    },
    {
        username: 'tom',
        email: 'email@email.com',
        password: '12345'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;