const Reply = require('../models/reply');
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const comment = require('../models/comment');
module.exports.submitReply = async(req,res)=>{
    try{
        console.log('hit submit repl')
    const{commentid} = req.params;
    const comment = await Comment.findById(commentid);
    console.log(req.body)
    const reply = await new Reply({body:req.body.comment,username:req.user.username,comment_ref:commentid,post_ref:req.params.id})
    comment.replies.push(reply)
    await reply.save();
    await comment.save();
    console.log('comment',comment,'reply',reply,)
    return res.json(reply)
    }catch(e){
        console.log(e)
    }
}
module.exports.retrieveReplies = async(req,res)=>{
    console.log('yes hit')
    const {id,commentid} = req.params;
    const comment = await Comment.findById(commentid).populate('replies');
    console.log('repliesexprees',comment.replies,'repliesexprees')
 
    return res.json(comment)
}
module.exports.likeModule = async(req,res)=>{
    console.log('liking')
    const{commentid,replyid} = req.params;
    const user = await User.findById(req.user._id)
    const comment = await Comment.findById(commentid)
    const reply = await Reply.findById(replyid)
    reply.likedBy.push(req.user)
    await reply.save();
    user.likedReplies.push(reply)
    await user.save()
    console.log('=liked reply',reply,'=liked reply')
    return res.json(reply)
}
module.exports.dislikeModule = async(req,res)=>{
    try{
    const{replyid} = req.params;
    const reply = await Reply.findById(replyid)
    const user = await User.findById(req.user._id);
    await user.updateOne({$pull:{likedReplies:reply._id}})
    console.log('disliking')
    await reply.updateOne({$pull:{likedBy:user._id}})
    await reply.save();
    await user.save();
    console.log('disliked reply',reply,'disliked reply');
    console.log(req.user) 
    return res.json(reply)
}catch(e){
    console.log(e)
}
}
// module.exports.verifyLikeStatus = async(req,res)=>{
//     try{
//         console.log('verifyying....')
//         const{commentid,replyid,postid} = req.params;
//         const comment = await Comment.findById(commentid).populate('replies');
//         const replies = comment.replies
//         comsole.log(replies)
        
//     }catch(e){
//         console.log('failed req')
//     }
// }