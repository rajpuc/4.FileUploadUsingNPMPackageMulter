const express = require('express');
const multer = require("multer");
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = "uploads/";
        if(!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath,{recursive:true});
        }
        cb(null,uploadPath);
    },
    filename: function (req, file, cb) {
        const fileExt = path.extname(file.originalname);
        const fileName = Date.now() +"-"+ Math.round(Math.random()*1e9);
        // console.log(file.fieldname);
        cb(null,file.fieldname+"_"+fileName+fileExt);
    }
})
  
const upload = multer({ storage: storage })
const app = express();
//Jehetu multiple file upload korbo tai upload.array use korte hobe and amader input er field name chilo avatar tai "avatar" diye dilam upload.array method a.
app.post("/",upload.array("avatar"),(req,res)=>{
    res.send("success");
})

app.use((err,req,res,next)=>{
    if(err){
        if(err instanceof multer.MulterError){
            res.status(500).send("There was an Upload Error");
        }else{
            res.status(500).send(err.message);
        }
    }else{
        res.send("success from middleware.");
    }
})

app.listen(3000,()=>{
    console.log('App is listening at port 3000');
});
