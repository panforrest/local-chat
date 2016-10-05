var express = require('express')
var router = express.Router()
var Profile = require('../models/Profile')
var ProfileController = require('../controllers/ProfileController')
var Place = require('../models/Place')
var PlaceController = require('../controllers/PlaceController')
var controllers ={
	profile: ProfileController,
	place: PlaceController 
}

router.get('/:resource', function(req, res, next){

	var resource = req.params.resource
	var controller = controllers[resource]
	controller.get(null)
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



	// if (resource == 'profile') {

	// 	ProfileController.get(null)
	// 	.then(function(results){
 //       	res.json({
 //        	confirmation: 'success',
 //        		results: results
 //        	})
 //       	    return
	// 	})
	// 	.catch(function(err){
 //    		res.json({
 //    			confirmation: 'fail',
 //    			message: err
 //    		})

 //    		return			
	// 	})

 //        // Profile.find(null, function(err, results){
 //        // 	if (err) {
 //        // 		res.json({
 //        // 			confirmation: 'fail',
 //        // 			message: err
 //        // 		})

 //        // 		return
 //        // 	} 

 //        // 	res.json({
 //        // 		confirmation: 'success',
 //        // 		results: results
 //        // 	})

 //        // 	return
 //        // })

	// }

	// if (resource == 'place') {

	// 	PlaceController.get(null)
	// 	.then(function(results){
 //       	res.json({
 //        	confirmation: 'success',
 //        		results: results
 //        	})
 //       	    return
	// 	})
	// 	.catch(function(err){
 //    		res.json({
 //    			confirmation: 'fail',
 //    			message: err
 //    		})

 //    		return			
	// 	})
	// }		

})

router.get('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
    var id = req.params.id

    if (resource == 'profile') {

        Profile.findById(id, function(err, result){
        	if (err) {
        		res.json({
	        		confirmation: 'fail',
	        		message: err
	        	})
	        	return	
        	}

	        res.json({
	        	confirmation: 'success',
	        	result: result
	        })

        return


        })



    }

})

router.post('/:resource', function(req, res, next){
	var resource = req.params.resource

	if (resource == 'profile') {
		Profile.create(req.body, function(err, result){
			if (err) {
				res.json({
					confirmation: 'fail',
					message: err
				})
				return
			}

			res.json({
				confirmation: 'success',
				result: result
			})
		})
	}
})

router.put('/:resource/:id', function(req, res, next){
	var resource = req.params.resource
	var id = req.params.id

	if (resource = 'profile') {
		Profile.findByIdAndUpdate(id, req.body, {new:true}, function(err, result){    //need to remember {new:true}
			if (err) {
				res.json({
					confirmation: 'fail',
					message: err
				})
				return
			}

			res.json({
				confirmation: 'success',
				result: result
			})
		})
	}
})


module.exports = router