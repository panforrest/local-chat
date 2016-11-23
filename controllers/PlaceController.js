var Place = require('../models/Place')
var Promise = require('bluebird')
// var superagent = require('superagent')
var Request = require('../utils/Request')

module.exports = {

	get: function(params, isRaw){
		return new Promise(function(resolve, reject){

			var sortOrder = -1
			if (params.sort == 'asc')
				sortOrder = 1

			delete params['sort']

			Place.find(params, null, {sort:{timestamp: sortOrder}}, function(err, places){
				if (err){
					reject(err)
					return
				}

				if (isRaw == true) {
				    resolve(places)	
				    return
				}

				var list = []
				for (i=0; i<places.length; i++){
					var place = places[i]
					list.push(place.summary()) 
				}				
				resolve(list)
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

				resolve(place.summary())

			})
		})
	},

	post: function(params){
		return new Promise(function(resolve, reject){
			console.log('TEST: ')
            // query Google Maps to get lat/lng
            // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCJrs8oxVQPDRzLUjjsVpQELHns1vjcH-k            

            //  1600+Amphitheatre+Parkway,+Mountain+View,+CA
            // var body = req.body

            //make a googel api request
            var address = params.address+', '+params.city+', '+params.state
            address = address.replace(' ', '+')

            console.log('ADDRESS: '+address)
			
			var url = 'https://maps.googleapis.com/maps/api/geocode/json'

			var geoParams = {
				key: process.env.GOOGLE_MAP_API,   //'AIzaSyCJrs8oxVQPDRzLUjjsVpQELHns1vjcH-k',
				address: address
			} 

			Request.get(url, geoParams, function(err, response){
                if (err) {
                	reject(err)
                	return
                }

                var results = response.results
				var locationInfo = results[0]
				var geometry = locationInfo.geometry
				var latLng = geometry.location
     
                params['geo'] = [latLng.lat, latLng.lng]

				Place.create(params, function(err, place){    //should be 'params' not 'req.body'
					if (err){
						reject(err)
						return
					}

					resolve(place.summary())

				})				
			})

			// }) 

			// superagent
			// .get(url)
			// .query(geoParams)
			// .set('Accept', 'text/json')
			// .end(function(err, response){
			// 	if (err) {
   //                  reject(err)
			// 		return
			// 	}

			// 	var results = response.body.results
			// 	console.log('RESULTS: '+JSON.stringify(results))
			// 	var locationInfo = results[0]
			// 	var geometry = locationInfo.geometry
			// 	var latLng = geometry.location

			// 	// res.send(latLng)
     
   //              params['geo'] = [latLng.lat, latLng.lng]

			// 	Place.create(params, function(err, place){    //should be 'params' not 'req.body'
			// 		if (err){
			// 			reject(err)
			// 			return
			// 		}

			// 		resolve(place.summary())

			// 	})				
			// })


			// Place.create(params, function(err, place){    //should be 'params' not 'req.body'
			// 	if (err){
			// 		reject(err)
			// 		return
			// 	}

			// 	resolve(place)

			// })
		})
	},

	put: function(id, params){
		return new Promise(function(resolve, reject){
			Place.findByIdAndUpdate(id, req.body, {new:true}, function(err, place){    //need to remember {new:true}
				if (err){
					reject(err)
					return
				}

				resolve(place.summary())
			})
		})
	}


}