import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    forum: String,
    image: String,
    likes: {
        type: [String],
        default: [],
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
});

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage; 
