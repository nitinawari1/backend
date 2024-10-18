const asyncHandler=(requestHandler) =>{
       return  (req , res , next ) =>{
         Promise.resolve(requestHandler(req, res , next )).
         catch((err) => next(err))
         }
}

export {asyncHandler}


// this is a highorder function 
// res,req ,next extracting from fn  
// const asynchandler = (fn) =>  async (res, req , next ) =>{
// try {
//          await fn(req , res , next) // executing fn come as a parameter 
         
// } catch (error) {
//          res.status(err.code || 500 ).json({
//                   success: false,
//                   message : err.message

//          })

// }
// }