const { User } = require('../models');

const userData = [{
        name: 'frank',
        email: 'frank@email.net',
        password: 'jfrank'

    },
    {
        name: 'sarah',
        email: 'sarah@email.com',
        password: 'sarah'
    },
    {
        name: 'bobby',
        email: 'bobby@email.com',
        password: 'bobby'
    },
    {
        name: 'tom',
        email: 'email@email.com',
        password: '12345'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;