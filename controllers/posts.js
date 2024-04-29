const Post = require('../models/post');
const User = require('../models/user');
const Reply = require('../models/reply')
const Comment = require('../models/reply')

module.exports.viewPost = async(req,res)=>{
    try{const id = req.params.id;
    const post = await Post.findById(id).populate({
        path:'comments',
        populate:{
            path:'author',
            
        }
    })
    // .populate({
    //     path:'comments',
    //     populate:{
    //         path:'replies'
    //     }
    // })
    // .populate({
    //     path:'comments',
    //     populate:{
    //         path:'likedBy'
    //     }
    // });
    // console.log('comm',post.comments[0])
    // const comments = await Comment.find({}).populate('likedBy');
    // const reqUsername = req.user.username;
    if(post){
        res.json({
            post: post,
            username: req.user.username,
            // user:req.user,
        });
        
    }else {
        res.status(404).json({ error: 'Document not found' });
      }}catch(error) {
      res.status(500).json({ error: 'Server error' });
      }
}

module.exports.submitPost = async(req,res)=>{
    
    const post  = await new Post(req.body.post);
    // post.images.path = req.file.path;
    // post.images.filename = req.file.filename
    post.images = req.file;
    post.author = req.user._id;
    await post.save();console.log(post)
    res.redirect('/')
}

module.exports.deletePost = async(req,res)=>{
    console.log('hit')
    await Post.findByIdAndDelete(req.params.id);
    await Reply.deleteMany({post_ref:req.params.id})
    res.redirect('/')
    
}
module.exports.likeModule = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id);
    const {id} = req.params;
    const post = await Post.findById(id);
    post.likedBy.push(user);
    user.likedPosts.push(post);
    await post.save();
    await user.save();

    } catch (error) {
        console.log(error)
    }
    res.send('liked')
}
module.exports.dislikeModule = async(req,res)=>{
   try {
    const user = await User.findById(req.user._id);
    const{id} = req.params;
    const post = await Post.findById(id)
    
    await post.updateOne({$pull:{likedBy:user._id}})
    await user.updateOne({$pull:{likedPosts:id}});
    await post.save();
    await user.save();
   } catch (error) {
        console.log(error)
   }
   res.send('disliked')

}
// module.exports.interactPost = async(req,res)=>{
//     try{
//     const {id}= req.params;
//     const post = await Post.findById(id).populate('likedBy');
    
//     console.log(post.likedBy)
//     res.json({
//         postLikes:post.likedBy,
//     })
//     }
//     catch(e){
//         console.log(e)
//     }
// }