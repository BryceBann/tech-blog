const { User } = require('../models')

const userData = 

    {
        'username': 'bob',
        'email': 'email@email.com',
        'password': 'abcd1234'
    }


const seedUsers = () => User.create(userData);

module.exports = seedUsers;