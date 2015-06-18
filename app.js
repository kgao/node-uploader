/*Define dependencies.*/

var express=require('express');
var multer  = require('multer');
var app=express();
var done=false;

/*Configure the multer.*/

app.use(multer({ dest: 'Root/Uploads/',
    rename: function (fieldname, filename) {
        return filename + "_" + Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        done = true;
    }
}));

/*Handling routes.*/

app.get('/',function(req,res){
    res.send('Hello, Uploader!');
});

app.post('/upload',function(req,res){
    if(done == true){
        console.log(req.files);
        res.end("File uploaded.");
    }
});

/*Run the server.*/
app.listen(7777,function(){
    console.log("Working on port 7777");
});
