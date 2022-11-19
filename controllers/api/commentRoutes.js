const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// 
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();

        if(!commentData) {
            res.status(404).json({message: 'No comments available'});
            return;
        }

        res.status(200).json(commentData);

    } catch (err) {
        res.status(500).json(err);
    }
});

//
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk({
            where: {
                id: req.params.id
            }
        });

        if (!commentData) {
            res.status(404). json({message: 'No comment available'});
            return;
        }

        res.status(200).json(commentData)

    } catch (err) {
        res.status(500).json(err);
    }
});

//
router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const commentData = await Comment.create({
                comment_body: req.body.comment_body,
                post_id: req.body.postId,
                user_id: req.session.user_id
            });

            res.status(200).json(commentData)
        }
    } catch (err) {
        res.status(500).json(err);
    }
    
});

//
router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update(
            {
                comment_body: req.body.comment_body
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        if (!commentData) {
            res.status(404).json({message: 'No comment found'});
            return;
        }

        res.status(200).json(commentData);

    } catch (err) {
        res.status(500).json(err)
    }
})

//
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!commentData) {
            res.status(404).json({message: 'No comment found with this id'});
            return;
        }

        res.status(200).json(commentData);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;