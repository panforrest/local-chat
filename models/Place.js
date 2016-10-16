var mongoose = require('mongoose')

var PlaceSchema = new mongoose.Schema({
	name: {type:String, default:''},
	description: {type:String, default:''},
	address: {type:String, default:''},
	type: {type:String, default:''},
	city: {type:String, default:''},
	state: {type:String, default:''},
    zip: {type:String, default:''},
    geo: {
    	type: [Number], //array of Numbers
    	index: '2d'
    },
    timestamp: {type:Date, default:Date.now}
})

PlaceSchema.methods.summary = function(){

    var summary = {
    	name: this.name,
    	description: this.description,
    	address: this.address,
    	type: this.type,
        city: this.city,
        state: this.city,
        geo: this.geo,
        timestamp: this.timestamp
    }


	return summary
}

module.exports = mongoose.model('PlaceSchema', PlaceSchema)