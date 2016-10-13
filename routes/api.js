var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
// // var Profile = require('../models/Profile')
// var ProfileController = require('../controllers/ProfileController')
// // var Place = require('../models/Place')
// var PlaceController = require('../controllers/PlaceController')
// var controllers ={
// 	profile: ProfileController,
// 	place: PlaceController 
// }

router.get('/:resource', function(req, res, next){

	var resource = req.params.resource
	var controller = controllers[resource]

    if (controller == null) {
    	res.json({
    		confirmation: 'fail',
            message: 'incorrect resource. Check your spelling dummy!'
    	})

    	return
    }

	controller.get(null, false)
	.then(function(results){
   	res.json({
    	confirmation: 'success',
    		results: results
    	})
   	    return
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})

		return			
	})

})

router.get('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
    var id = req.params.id

	var controller = controllers[resource]


    if (controller == null) {
    	res.json({
    		confirmation: 'fail',
            message: 'incorrect resource. Check your spelling dummy!'
    	})

    	return
    }

	controller.getById(id)
	.then(function(result){
   	res.json({
    	confirmation: 'success',
    		result: result
    	})
   	    return
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: 'Not Found'
		})

		return			
	}) 

})

router.post('/:resource', function(req, res, next){
	var resource = req.params.resource
	var controller = controllers[resource]

    if (controller == null) {
    	res.json({
    		confirmation: 'fail',
            message: 'incorrect resource. Check your spelling dummy!'
    	})

    	return
    }

	controller.post(req.body)
	.then(function(result){
   	res.json({
    	confirmation: 'success',
    		result: result
    	})
   	    return
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})

		return			
	}) 

	// if (resource == 'profile') {
	// 	Profile.create(req.body, function(err, result){
	// 		if (err) {
	// 			res.json({
	// 				confirmation: 'fail',
	// 				message: err
	// 			})
	// 			return
	// 		}

	// 		res.json({
	// 			confirmation: 'success',
	// 			result: result
	// 		})
	// 	})
	// }
})

router.put('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var id = req.params.id

	var controller = controllers[resource]


    if (controller == null) {
    	res.json({
    		confirmation: 'fail',
            message: 'incorrect resource. Check your spelling dummy!'
    	})

    	return
    }

	controller.put(id, req.body)      //, {new:true})
	.then(function(result){
   	res.json({
    	confirmation: 'success',
    		result: result
    	})
   	    return
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})

		return			
	}) 

	// if (resource = 'profile') {
	// 	Profile.findByIdAndUpdate(id, req.body, {new:true}, function(err, result){    //need to remember {new:true}
	// 		if (err) {
	// 			res.json({
	// 				confirmation: 'fail',
	// 				message: err
	// 			})
	// 			return
	// 		}

	// 		res.json({
	// 			confirmation: 'success',
	// 			result: result
	// 		})
	// 	})
	// }
})


module.exports = router