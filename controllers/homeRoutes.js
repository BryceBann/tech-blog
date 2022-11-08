const sequlize = require('../config/connection');
const {Post, User, Comment} = require('../models');
const router = require('express').Router();

//add explanation
router.get('/', (req, res) => {
    Post.findAll({
            attributes: [
                'id',
                'title',
                'textBody'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                    // include: {
                    //     model: User,
                    //     attributes: ['username']
                    // }
                },
                // {
                //     model: User,
                //     attributes: ['username']
                // }
            ]
        })
        .then(PostData => {
            const posts = PostData.map(post => post.get({ plain: true }));
            res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//add explanation
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//add explanation
router.get('/signup', (req, res) => {
    res.render('signup');
});

//add explanation
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'textBody',
            'title'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id'],
            // include: {
            //     model: User,
            //     attributes: ['username']
            // }
        },
        // {
        //     model: User,
        //     attributes: ['username']
        // }
      ]
    })
    .then(PostData => {
        if(!PostData) {
            res.status(404).json({messgae: 'No post found with this id'});
            return;
        }
        const post = PostData.get({plain: true});
        console.log(post);
        res.render('single-post', {post, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//add explanation
router.get('/post-comments', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'textBody',
            'title'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id'],
            // include: {
            //     model: User,
            //     attributes: ['username']
            // }
        },
        // {
        //     model: User,
        //     attributes: ['username']
        // }
      ]
    })
    .then(PostData => {
        if(!PostData) {
            res.status(404).json({messgae: 'No post found with this id'});
            return;
        }
        const post = PostData.get({plain: true});
        res.render('post-comments', {post, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
