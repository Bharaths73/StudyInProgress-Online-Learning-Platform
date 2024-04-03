const mongoose=require('mongoose');

const courseProgess=new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    },
    completedVideos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'SubSection'
        }
    ]
})

module.exports=mongoose.model('CourseProgress',courseProgess);