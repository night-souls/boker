var express =require("express");
var router = express.Router();
var userModel = require("../model/user");

router.get("/",(req,res)=>{

	res.render("login",{title:"登陆页面"});
})

router.post("/",(req,res)=>{
	console.log(req.body);	


	userModel.find(req.body).then(result=>{
		console.log(result)
		if(result.length==0){
			res.render("login",{title:"登陆页面"});
		}else{
			req.session.whatever=result[0]
			res.redirect("/");
		}
	})
})

module.exports  = router;