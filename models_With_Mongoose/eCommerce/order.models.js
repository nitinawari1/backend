import mongoose from "mongoose";

//this is a mini Schema it help to structure the order , it help us to hold the quantity of  multiple product 
 const  orderItemSchema = new mongoose.Schema({

         productId:{
                  type:mongoose.Schema.Types.ObjectId,
                  ref:"Product"
         },
         quantity:{
                  type:Number,
                  required:true
         }
})

const orderSchema = new mongoose.Schema({
         orderPrice:{
                  type:Number,
                  required:true
         },
         customer:{
                  type:mongoose.Schema.Types.ObjectId,
                  ref:"User"
         },
         oderItems:{
                  type:[orderItemSchema] // passing mini schema 
                  //we can also use this syntax
         //          type:[
         //          {
         //                   productId:{
         //                            type:mongoose.Schema.Types.ObjectId,
         //                            ref:"Product"
         //                   },
         //                   quantity:{
         //                            type:Number,
         //                            required:true
         //                   }
         //          }
         // ]

         },
         address:{
                  type:String,
                  required:true
         },
         status:{
                  type:String,
                  enum:["pending" , "cancelled" , "delivered"] ,// this is a choices user can choose on of them and is must 
                  default:"pending"
         }


},{timestamps})

 export const Order = mongoose.model("Order" , orderSchema)