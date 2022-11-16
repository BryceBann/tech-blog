const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: ['id', 'title', 'post_body', 'date_created'],
            order: [['date_created', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: [
                        'id', 'comment_body', 'post_id', 'user_id', 'date_created'
                    ],
                    include: [
                        {
                            model: User,
                            attributes: ['username']
                        }
                    ]
                }
            ]
        })
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'title', 'post_body', 'date_created'],
            order: [['date_created', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username', 'github']
                },
                {
                    model: Comment,
                    attributes: [
                        'id', 'comment_body', 'post_id', 'user_id', 'date_created'
                    ],
                    include: [
                        {
                            model: User,
                            attributes: ['username', 'github']
                        }
                    ]
                }
            ]
        });

        if (!postData) {
            res.status(404).json({message: 'No post found.'});
            return;
        }

        res.status(200).json(postData)

    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            post_body: req.body.postBody,
            user_id: req.session.user_id
        });
        
        res.status(200).json(postData)
    
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(
            {
                title: req.body.title,
                post_body: req.body.postBody
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        if (!postData) {
            res.status(404).json({message: 'No post with that id found'});
            return;
        }

        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            }
        });

        if (!postData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }

        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;