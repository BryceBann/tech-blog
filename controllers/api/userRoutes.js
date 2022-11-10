const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
            attributes: { exclude: ['[password'] }
        })
        .then(UserData => res.json(UserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Post,
                    attributes: [
                        'id',
                        'title',
                        'textBody'
                    ]
                },

                {
                    model: Comment,
                    attributes: ['id', 'comment_text'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                },
                {
                    model: Post,
                    attributes: ['title'],
                }
            ]
        })
        .then(UserData => {
            if (!UserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(UserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.post('/', (req, res) => {

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    .then(UserData => {
            req.session.save(() => {
                req.session.user_id = UserData.id;
                req.session.username = UserData.username;
                req.session.loggedIn = true;

                res.json(UserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if(!userData) {
            res.status(400).json({message:'Incorrect username. Please try again.'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(400).json({message: 'Incorrect password. Please try again.'});
            return;
        }
        
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({user: userData, message: 'You are now logged in!'})
        })
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', (req, res) => {

    User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then(UserData => {
            if (!UserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(UserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

router.delete('/:id', (req, res) => {
    User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(UserData => {
            if (!UserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(UserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;