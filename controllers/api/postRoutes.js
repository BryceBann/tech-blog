const router = require('express').Router();
const { Post, User, Comment} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id',
        'title',
        'textBody'
    ],
    order: [
        ['created_at', 'DESC']
    ],
    include: [{
        model: User,
        attributes: ['username']
    },
    {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id'],
    }
  ]
})
.then(PostData => res.json(PostData.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
 });

 router.get('/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'textBody',
                'title'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
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
            res.json(PostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        .then(PostData => res.json(PostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where: {
                id: req.params.id
            }
        }).then(PostData => {
            if (!PostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(PostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(PostData => {
        if (!PostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(PostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;