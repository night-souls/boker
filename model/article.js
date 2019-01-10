
//
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var obj = {
	title:String,
	content:String,
	author:String,
	createTime:Date,
	imgPath:String
}



var model =  mongoose.model("article",new Schema(obj));


module.exports = model;