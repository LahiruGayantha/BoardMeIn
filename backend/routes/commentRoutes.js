const express = require('express');

const router = express.Router();

const commentController = require('../controllers/commentCtrl');

router.post('/', commentController.addComment);

router.delete('/', commentController.deleteComment);

router.post('/reply', commentController.addReply);

router.get('/:id', commentController.getCommentbyPid);

module.exports = router;
