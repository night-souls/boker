var express = require('express');
var router = express.Router();
var blogModel = require("../model/article");

router.get('/', function(req, res, next) {
  if(req.session.whatever){

  	console.log(req.query.id);

  	blogModel.find({
  		_id:req.query.id
  	}).then(result=>{

  		res.render('detail', {title:"detail",info:result[0]});
  	})
  	
  }else{
  	res.redirect("/login");
  }
  
}); 

router.get("/:kerwinid",function(req, res, next) {
  if(req.session.whatever){

  	console.log(req.params.kerwinid); 

  	blogModel.find({
  		_id:req.params.kerwinid
  	}).then(result=>{
  		
  		res.render('detail', {title:"detail",info:result[0]});
  	})
  	
  }else{
  	res.redirect("/login");
  }
  
}); 

module.exports = router;