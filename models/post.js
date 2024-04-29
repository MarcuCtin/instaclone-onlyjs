const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment');
const Reply = require('./reply')
const ImageSchema  = new Schema({
    path:String,
    filename:String,
})
ImageSchema.virtual('postImage43').get(function(){
    return this.path.replace('/upload','/upload/ar_3:4,c_fill,g_auto');
})
ImageSchema.virtual('postImage11').get(function(){
    return this.path.replace('/upload','/upload/ar_1:1,c_fill,g_auto');
})
const opts ={toJSON:{virtuals:true}}
const postSchema = new Schema ({
    
    images:ImageSchema,
  // likedBy:[{
    //     type:Schema.Types.ObjectId,
    //     ref:'User',
    // }],
    // reviews:
    // [
    //     {
    //         type:Schema.Types.ObjectId,
    //         ref:'User',
    //     }
    // ],
    // images:[ImageSchema],
    description:{
        type:String,
        required:true,
    },
    location:String,
    comments:[{
        type:Schema.Types.ObjectId,
        ref:'Comment',
    }],
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    likedBy:[{
        type:Schema.Types.ObjectId,
        ref:'User',
    }],
},opts);
postSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
    }
})
module.exports = mongoose.model('Post',postSchema);// likedBy:[{
    //     type:Schema.Types.ObjectId,
    //     ref:'User',
    // }],
    // reviews:
    // [
    //     {
    //         type:Schema.Types.ObjectId,
    //         ref:'User',
    //     }
    // ],
    // images:[ImageSchema],
    // likedBy:[{
    //     type:Schema.Types.ObjectId,
    //     ref:'User',
    // }],
    // reviews:
    // [
    //     {
    //         type:Schema.Types.ObjectId,
    //         ref:'User',
    //     }
    // ],
    // images:[ImageSchema],