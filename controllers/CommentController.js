var comment = require('../models/Comment.js')
var Promise = require('bluebird')

module.exports = {

	get: function(params, isRaw){
		return new Promise(function(resolve, reject){
            var sortOrder = (params.sort == 'asc') ? 1: -1
			delete params['sort']

			Comment.find(params, null, {sort:{timestamp: sortOrder}}, function(err, comments){
                if (err) {
                	// res.json({
	                // 	confirmation: 'fail',
	                // 	message: err                 		
                	// })
                	reject(err)
               	    return
                }

                if (isRaw == true){
                	resolve(comments)
                	return
                }

                // res.json({
                // 	confirmation: 'sucess',
                // 	comments: comments
                // })

                var list = []
                for (var i=0; i<comments.length; i++) {
                	var comment = comments[i]
                	list.push(comment)
              
                }
                resolve(list)
			})

		})
	},

	getById: function(id){
		return new Promise(function(resolve, reject){
			Comment.findById(id, function(err, comment){
				if (err){
					reject(err)
					return
				}
				resolve(comment.summary)
			})
		})
	}

	// post: function(params){
 //        return new Promise(function(resolve, reject){
 //            Comment.create(params, function(err, comment){
 //            	if (err){
 //            		reject(err)
 //            		return
 //            	}
 //            })
 //        }
	// }
}













