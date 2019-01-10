var express = require('express');
var router = express.Router();
var blogModel = require("../model/article");

var multer = require("multer");
var upload = multer({ dest: 'public/uploads/'})

router.get('/', function(req, res, next) {
  if(req.session.whatever){
  	res.render('blog', {isnew:true});
  }else{
  	res.redirect("/login");
  }
  
}); 


router.get('/delete/:id', function(req, res, next) {
	if(req.session.whatever) {
		blogModel.findByIdAndRemove(req.params.id).then(result=>{
			res.redirect("/");
		})
	}else {
		res.redirect("/login");
	}
});


router.get('/update/:id', function(req, res, next) {
	if (req.session.whatever) {
		blogModel.findById(req.params.id).then(result=>{
			 console.log(result);
			res.render('blog', {isnew:false, info:result});
		})
	} else {
		res.redirect("/login");
	}
});


router.post("/",upload.single("myfile"),(req,res)=>{
	console.log(req.file);

	blogModel.create({
		title:req.body.title,
		content:req.body.content,
		author:req.session.whatever.username,
		createTime:Date.now(),
		imgPath:req.file?`/uploads/${req.file.filename}`:``
	}).then(result=>{
		res.redirect("/");
	})
})


router.post("/update/:id", upload.single("myfile"),(req, res)=>{
	console.log(req.body);

	blogModel.findByIdAndUpdate(req.params.id,
		{$set:{title:req.body.title, content:req.body.content,
			imgPath:req.file?`/uploads/${req.file.filename}`:req.body.oldpath
		}}).then(result=>{
			res.redirect("/");
	})
})


module.exports = router;
