var express = require('express')
var router = express.Router()
var GoogleMapsAPI = require('googlemaps')

router.get('/', function(req, res, next){

	var publicConfig = {
	  key: process.env.GOOGLE_MAP_API,
	  stagger_time:       1000, // for elevationPath 
	  encode_polylines:   false,
	  secure:             true, // use https 
	  //proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests 
	};

	var gmAPI = new GoogleMapsAPI(publicConfig);


	var geocodeParams = {
	    address:    "27 East 28th Street, New York, NY",
        language:   "en"
	};


	gmAPI.geocode(geocodeParams, function(err, result){
	  console.log('MAPS API REQ: '+result);
	  	res.json({
		  confirmation: result //'success'
	  })
	});




})

module.exports = router