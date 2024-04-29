const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    likedPosts:[{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }],
    likedReplies:[{
        type:Schema.Types.ObjectId,
        ref:'Reply'
    }],
    followedBy:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    following:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }]
})
userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User',userSchema)