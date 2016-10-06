var Place = require('../models/Place')
var Promise = require('bluebird')

module.exports = {

	get: function(params){
		return new Promise(function(resolve, reject){
			Place.find(params, function(err, places){
				if (err){
					reject(err)
					return
				}

				resolve(places)
				
			})
		})

	},

	getById: function(id){
		return new Promise(function(resolve, reject){
			Place.findById(id, function(err, place){
				if (err){
					reject(err)
					return
				}

				resolve(place)

			})
		})
	},

	post: function(params){
		return new Promise(function(resolve, reject){
			Place.create(params, function(err, place){    //should be 'params' not 'req.body'
				if (err){
					reject(err)
					return
				}

				resolve(place)

			})
		})
	},

	put: function(id, params){
		return new Promise(function(resolve, reject){
			Place.findByIdAndUpdate(id, req.body, {new:true}, function(err, place){    //need to remember {new:true}
				if (err){
					reject(err)
					return
				}

				resolve(place)
			})
		})
	}


}