import multer from "multer"

const storage = multer.diskStorage({ // type of storage
         destination: function (req, file, cb) {
           cb(null, './public/temp') //cb  handle by multer
         },
         filename: function (req, file, cb) {
           cb(null, file.originalname)
         }
       })
 export const upload = multer({ storage }) // exporting
//   upload with storage object for using as middleware
 
       