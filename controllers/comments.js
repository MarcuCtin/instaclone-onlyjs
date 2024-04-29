const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.submitComment = async(req,res)=>{
    console.log(req.body)
    const{id} = req.params;
    const post = await Post.findById(id);
    const {comment} = req.body;

    const newComment =  new Comment({body:comment}); 
    newComment.author = req.user._id; 
    post.comments.push(newComment);
    await post.save();
    await  newComment.save();
    return res.json(newComment)
    res.send('good')
    // console.log('post',post)
}
module.exports.like= async(req,res)=>{
    try{
    const comment = await Comment.findById(req.params.commentid);
    
    comment.likedBy.push(req.user);
    await comment.save();
    res.send('ok')
    console.log(comment,'liked')
    }
    catch(e){
        console.log(e)
    }
}

module.exports.interactComment=async(req,res)=>{
    const {commentid} = req.params
    const comment = await Comment.findById(commentid).populate('likedBy');
    const likeList = comment.likedBy
    res.json(likeList)
    console.log(likeList)
}
module.exports.dislike = async(req,res)=>{
    try{
        const{commentid} = req.params;
        const comment = await Comment.findById(commentid)
        await comment.updateOne({$pull:{likedBy:req.user._id}})
        await comment.save()
        res.send('ok')
        console.log(comment,'disliked')
    }
    catch(e){
        console.log(e)
    }
}
module.exports.deleteComment = async(req,res)=>{
    const post = await Post.findById(req.params.postid)
    await Comment.findByIdAndDelete(req.params.commentid)
    req.flash('success','comment deleted')
    res.sendStatus(200)
}