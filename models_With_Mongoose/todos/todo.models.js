import mongoose from "mongoose"; 

const TodoSchema= new mongoose.Schema({
         content: {
                  type: String,
                  required: true,
                },
         completed: {
                  type: Boolean,
                  default: false,
                },
         createdBy:{
           type: mongoose.Schema.Type.objectId, //this is a type like string or number and this denoted that we going to give some refrence 
           ref:'User' // refrrence to the User schema from there all detail will fetch  //this is a must line after type 
           // this User is first parameter of model from third line of user.models.js
         },    
         subTodos:[
          {
                  type:mongoose.Schema.Types.ObjectId,
                  ref: 'SubTodo'
         }
]
         
} ,{timestamps:true});

export const  Todo = mongoose.model("Todo" , TodoSchema)