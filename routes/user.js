const express = require('express');
const router = express.Router({mergeParams:true});
const user = require('../controllers/user')
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,isAuthor} = require('../middleware');
router.get('/',isLoggedIn,catchAsync(user.profilePage));
router.post('/unfollow',isLoggedIn,catchAsync(user.unfollow));
router.post('/follow',isLoggedIn,catchAsync(user.follow));
module.exports = router;