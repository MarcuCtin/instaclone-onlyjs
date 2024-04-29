const express = require('express');
const router = express.Router({mergeParams:true});
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});
const posts = require('../controllers/posts')
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,isAuthor} = require('../middleware')
router.post('/',upload.single('image'),catchAsync(posts.submitPost));
router.delete('/:id',isAuthor,catchAsync(posts.deletePost));
router.get('/:id',catchAsync(posts.viewPost));
router.post('/:id/likeModule',catchAsync(posts.likeModule))
router.post('/:id/dislikeModule',catchAsync(posts.dislikeModule));

module.exports = router;