const User= require('../models/user');
const Post = require('../models/post')
module.exports.profilePage = async(req,res)=>{
    const{username} = req.params
    const user = await User.findByUsername(username).populate('followedBy').populate('following')
    const currentUser = await User.findById(req.user._id)
    console.log('currentUser following',currentUser.following,'currentUser following');
    console.log('User followedBy',user.followedBy,'')
    const posts = await Post.find({author:user._id}).populate('author').populate('comments').populate({path:'comments',populate:{path:'replies'}}).populate({path:'comments',populate:{path:'replies',populate:{path:'likedBy'}}});
    res.render('user/profilePage',{posts,user})
}
module.exports.follow = async(req,res)=>{
    const {username} = req.params
    const user = await User.findByUsername(username);
    const currentUser = await User.findById(req.user._id);
    if(!user.followedBy.includes(currentUser._id))
    {
        user.followedBy.push(currentUser);
        currentUser.following.push(user);
        await user.save()
        await currentUser.save()
        
    }
    res.json({
        followed:'true'
    })
}
module.exports.unfollow = async(req,res)=>{
    try{
    const {username} = req.params
    const user = await User.findByUsername(username);
    const currentUser = await User.findById(req.user._id);
        await user.updateOne({$pull:{followedBy:currentUser._id}})
        await currentUser.updateOne({$pull:{following:user._id}})
        await currentUser.updateOne({$pull:{followedBy:user._id}})
        await user.save()
        
        await currentUser.save()
        
    
    res.json({
            followed:'false'
        })
    }catch(e){
        console.log(e)
    }
}