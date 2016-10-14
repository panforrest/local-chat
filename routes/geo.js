var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next){      //not ('/:address'

	var address = req.query.address

	res.json({
		confirmation: 'success',
		address: address 
	})

})



module.exports = router