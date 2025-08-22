const File= require("../models/File.js");
const express = require('express');
const router = express.Router();
const multer= require("multer");
const upload = multer({ dest: 'uploads/' })
const cloudinary= require("../configs/CloudinaryConfig.js");
const fs= require("fs");
const { shortenUrl } = require("../service/urlService.js");


router.post("/upload",upload.single('file'),async(req,res)=>{
    try{
        const {expiry}=req.body;
        if(!req.file) return res.status(400).json({error: 'No file uploaded'});
        const result= await cloudinary.uploader.upload(req.file.path,{
            resource_type:'auto',
        });
        fs.unlinkSync(req.file.path);
        const shortId= await shortenUrl(result.url);
        // const expiry=getExpiryDate();
        const createdFile= await File.create({
            shortId,
            cloudinaryUrl:result.url,
            fileName:req.file.originalname,
            size:req.file.size,
            expiry: new Date()
        })
        res.json({createdFile});

    }
    catch(err){
        console.error(err);
    }

})

module.exports=router;