const { User } = require('../models');

const userData = [{
        name: 'John',
        email: 'john@email.com',
        password: 'john'

    },
    {
        name: 'Jake',
        email: 'jake@email.com',
        password: 'jake'
    },
    {
        name: 'Joe',
        email: 'joe@email.com',
        password: 'joe'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;