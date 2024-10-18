import mongoose, {Schema} from "mongoose";
import mongooseaggregatepaginate from "mongoose-aggregate-paginate-v2"
const videoSchema = new Schema({

         videoFile:{
                  type:String, // cloudnary
                  required:true
         },
         thumbnail:{
                  type:String, // cloudnary
                  required:true
         },
         owner:{
                  type:Schema.Types.ObjectId,
                  ref:"User"
         },
         title:{
                  type:String,
                  required:true
         },
         description:{
                  type:String,
                  required:true
         },
         duration:{
                  type:Number,
                  required:true
         },
         views:{
               type:Number,
               default:0
         },
         isPublished:{
                  type:Boolean,
                  default:true
         },



},{timestamps:true})

videoSchema.plugin(mongooseaggregatepaginate)


export const Video = mongoose.model("video" , videoSchema)