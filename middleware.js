const Post = require('./models/post');
const User = require('./models/user');
const Comment = require('./models/comment');
const ExpressError = require('./utils/ExpressError');
module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','You must be signed in first');
        return res.redirect('/')
    }
    next()
}
module.exports.isAuthor = async (req,res,next)=>{
    const post = await Post.findById(req.params.id);
    console.log(post.author,req.user._id)
    if(!post.author.equals(req.user._id))
        {console.log('pizda')
            
        req.flash('error','no')
        return res.redirect('/')
    }
    console.log('pula')
    next();
    //de facut client side deletion 
}