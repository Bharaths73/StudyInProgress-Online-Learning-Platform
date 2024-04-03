const mongoose=require('mongoose');

const category=new mongoose.Schema({
  name:{
    type:String,
    trim:true
  },
  description:{
    type:String,
  },
  course:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Course'
    }
  ]
})

module.exports=mongoose.model('Category',category);