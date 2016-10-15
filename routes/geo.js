var express = require('express')
var router = express.Router()
var superagent = require('superagent')

router.get('/', function(req, res, next){      //not need ('/:address'

	var address = req.query.address

	//make a googel api request
	var url = 'https://maps.googleapis.com/maps/api/geocode/json'

	var params = {
		key: 'AIzaSyCJrs8oxVQPDRzLUjjsVpQELHns1vjcH-k',
		address: '1600+Amphitheatre+Parkway,+Mountain+View,+CA'
	}  

	superagent
	.get(url)
	.query(params)
	.set('Accept', 'text/json')
	.end(function(err, response){
		if (err) {
			res.json({
				confirmation: 'fail',
				message: err
			})
			return
		}

		var results = response.body.results
		var locationInfo = results[0]
		var geometry = locationInfo.geometry
		var latLng = geometry.location

		res.send(latLng)
	})

	// res.json({
	// 	confirmation: 'success',
	// 	address: address 
	// })

})



module.exports = router