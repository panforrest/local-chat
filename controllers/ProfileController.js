var Profile = require('../models/Profile')
var Promise = require('bluebird')
var bcrypt = require('bcrypt')

module.exports = {

	get: function(params){
		return new Promise(function(resolve, reject){
			Profile.find(params, function(err, profiles){
				if (err){
					reject(err)
					return
				}

				resolve(profiles)
				return
			})
		})

	},

	getById: function(id){
		return new Promise(function(resolve, reject){
			Profile.findById(id, function(err, profile){      //param is to be replaced by id
				if (err){
					reject(err)
					return
				}

				resolve(profile)
				
			})
		})
	},

	post: function(params){
		return new Promise(function(resolve, reject){
            // var password = params.password
            // params['password'] = bcrypt.hashSync(passowrd, 10)

			var password = params.password
			params['password'] = bcrypt.hashSync(password, 10)

			Profile.create(params, function(err, profile){
				if (err){
					reject(err)
					return
				}

				resolve(profile)
				
			})			

		})		
	},

	put: function(id, params){
		return new Promise(function(resolve, reject){
			Profile.findByIdAndUpdate(id, req.body, {new:true}, function(err, profile){    //need to remember {new:true}
				if (err){
					reject(err)
					return
				}

				resolve(profile)
			})
		})
	}


}