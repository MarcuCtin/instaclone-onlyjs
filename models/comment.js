const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Replies = require('./reply')
const reviewSchema = new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    likedBy:[{
        type:Schema.Types.ObjectId,
        ref:'User',
    }],
    body:String,
    replies:[{
        type:Schema.Types.ObjectId,
        ref:'Reply'
    }]
})
reviewSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Replies.deleteMany({
            _id: {
                $in: doc.replies
            }
        })
    }
})
module.exports = mongoose.model('Comment',reviewSchema)