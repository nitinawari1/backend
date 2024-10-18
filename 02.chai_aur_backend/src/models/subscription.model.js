import mongoose, { Schema } from "mongoose";
// import mongoose {Schema} from "mongoose";

const subscriptionSchema = new  Schema({
      subscriber:{
         type:Schema.Types.ObjectId, // one who is suscribing
         ref:"User"
      },
      channel:{
         type:Schema.Types.ObjectId, // one to who is subscriber subcribing
         ref:"User"
      }   

},{timestamps:true})
export const Subscription = mongoose.model("Subscription" , subscriptionSchema)