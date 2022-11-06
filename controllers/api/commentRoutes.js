const router = require('express').Router();
const { Router } = require('express');
const {Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({})
    .then(commentData => res.json(commentData))
    .catch(err => {
        comsole.log(err);
        res.status(500).json(err);
    })
});


