const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'textBody'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['name']
            }
        }
    ]
    })
    .then(PostData => {
        const posts = PostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, logedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/edit/:id', withAuth, (req, res) => {
    Post.findAll({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'textBody'
        ],
        include: [{
            model: User,
            attributes: ['name']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id'],
        }
    ]
    })
    .then(PostData => {
        if (!PostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        const post = PostData.get({ plain: true });
        res.render('edit-post', { post, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})


router.get('/new', (req, res) => {
    res.render('new-post');
});


module.exports = router;
