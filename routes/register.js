var express = require("express");
var router = express.Router();
var userModel = require("../model/user");

router.get("/",(req,res)=>{
	res.render("register",{title:"注册页面"});
})


router.get("/check",(req,res)=>{

	userModel.find(req.query).then(result=>{
		if(result.length==0){
			res.send({ok:1}) 
		}else{
			res.send({ok:0})
		}
	})
})
router.post("/",(req,res)=>{
	console.log(req.body);

	userModel.create({
		username:req.body.username,
		email:req.body.email,
		password:req.body.password
	}).then(result=>{
		res.redirect("/");
	}).catch(error=>{

	})
})


module.exports = router;