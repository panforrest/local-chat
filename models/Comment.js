var mongoose = require('mongoose')

var CommentSchema = new mongoose.Schema({
	text: {type:String, trim:true, require:true, default:''},
	profile: {type:String, require:true, default:''},
	timestamp: {type:Date, default:Date.now}
})

CommentSchema.methods.summary = function(){
	var summary = {
		text: this.text,
        profile: this.profile,
        timestamp: this.timestamp,
        id: this._id
	}

	return summary
}

module.exports = mongoose.model('CommentSchema', CommentSchema)