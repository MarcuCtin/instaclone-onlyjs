const express = require('express');
const router = express.Router({mergeParams:true});

const comments = require('../controllers/comments')
const replies = require('../controllers/replies')
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,isAuthor} = require('../middleware');
router.post('/',catchAsync(comments.submitComment))
router.post('/:commentid/like',catchAsync(comments.like))
router.post('/:commentid/dislike',catchAsync(comments.dislike))
router.post('/:commentid',catchAsync(comments.interactComment))
router.post('/:commentid/reply',catchAsync(replies.submitReply))
router.post('/:commentid/reply/retrieveReplies',catchAsync(replies.retrieveReplies))
router.post('/:commentid/reply/:replyid/like',catchAsync(replies.likeModule))
router.post('/:commentid/reply/:replyid/dislike',catchAsync(replies.dislikeModule))
router.post('/:commentid/reply/verifyLikeStatus',catchAsync(replies.verifyLikeStatus))
router.post('/:commentid/delete',catchAsync(comments.deleteComment))
module.exports = router