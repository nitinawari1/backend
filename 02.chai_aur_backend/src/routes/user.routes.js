


import {Router }from "express";
import 
{registerUser , 
         loginUser,
                          logoutUser,
                           refreshAccessToken , 
                           changeCurrentPassword ,
                           getCurrentuser , 
                           updateUserDetails , 
                           updateAvatar , 
                           updateCoverImage } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
 
const router  = Router(); //creating router 
  
router.route("/register").post(
         upload.fields([
                  {
                           name:"avatar",
                           maxcount : 1
                  },{
                           name: "coverImage",
                           maxcount:1
                  }
         ]),
         registerUser)  // giving router for particular endpoint with mehthod like get , poaat  and function to execute here registeruser 

router.route("/login").post(loginUser)

//secured routes - means user must be logedin
router.route ("/logout").post(verifyJWT , logoutUser)
router.route ("/refresh-token").post( refreshAccessToken)
router.route("/change-password").post(verifyJWT ,changeCurrentPassword ) 

router.route("/get-user").get(verifyJWT , getCurrentuser)

router.route("/update-user").put(verifyJWT,updateUserDetails)


router.route("/change-avatar").post(verifyJWT,
         upload.single('avatar'),
         updateAvatar) 


router.route("/change-coverImage").post(verifyJWT,
         upload.single("coverImage"),
         updateCoverImage) 


export default router
