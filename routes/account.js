var express = require('express');
var router = express.Router();
var ProfileController = require('../controllers/ProfileController')

router.post('/:action', function(req, res, next){    //not ('/:resource'... because this is not REST
    var action = req.params.action

    if (action == 'login') {
    	var email = req.body.email
    	ProfileController.get({email:email})
    	.then(function(profiles){
            if(profiles.length == 0){
            	res.json({
            		confirmation:'fail',
            		message:'Profile not found. Check spelling.'
            	})

            	return
            }

            var profile = profiles[0]
            res.json({
            	confirmation:'success',
            	profile: profile
            })
    	})
    	.catch()
        
    }
})

module.exports = router;