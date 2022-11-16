const router = require('express').Router();
const sequelize= require('../config/connection');
const { User, Post, Comment } = require('../models');


router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: ['id', 'title', 'post_body', 'date_created'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_body', 'post_id', 'user_id', 'date_created'],
                    include: {
                        model: User,
                        attributes: ['username', 'github']
                    }
                },
                {
                    model: User,
                    attributes: ['username', 'github']
                }
            ]
        });

        const posts = postData.map(post => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err)
    }
});


router.get('/login', async (req, res) => {

    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');

});


router.get('/signup', async (req, res) => {

    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup');
    
});


router.get('/post/:id', async (req, res) => {
    try {
        const singlePost = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'title', 'post_body', 'date_created'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_body', 'post_id', 'user_id', 'date_created'],
                    include: {
                        model: User,
                        attributes: ['username', 'github']
                    }
                },
                {
                    model: User,
                    attributes: ['username', 'github']
                }
            ]
        });

        if (!singlePost) {
            res.status(404).json({message: "No post found!"});
            return;
        }

        const post = singlePost.get({ plain: true });

        res.render('single-post', {
            post,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;