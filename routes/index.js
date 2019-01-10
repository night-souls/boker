var express = require('express');
var router = express.Router();
var blogModel  =require("../model/article");
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.whatever){
  	blogModel.find({
  		author:req.session.whatever.username
  	},{content:0},{sort:{title:-1}}).then(result=>{
  		console.log(result);
  		res.render('index', { title: 'Express' ,who:req.session.whatever.username,
  			list:result,
  			handleDate:function(data){
  				console.log(data);
  				return data;
  			}
  		});
  	})
  }else{
  	res.redirect("/login");
  }
});


router.get("/logout",(req,res)=>{
	req.session.destroy(()=>{
		res.redirect("/login");
	})
})
module.exports = router;
