const express = require("express");
const multer = require('multer');
const fs = require('fs');
const path = require("path")
const uploadDir = "./uploads";
const { Getproduct, Addproduct, Updateproduct, Removeproduct,Searchproduct } = require('../Controller/productController')

const router = express.Router();

  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/assign/public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage });

router.get('/getproduct', Getproduct);
router.post('/addproduct', upload.single('image'), Addproduct);
router.put('/updateproduct/:id', upload.single('image'), Updateproduct);
router.delete('/deleteproduct/:_id', Removeproduct);
router.get('/searchproduct',Searchproduct)
module.exports = router;