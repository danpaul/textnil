exports.responseCallback = function(res){
	return function(err, record){
		if(err){ console.log(err);
		} else {
			res.send(record); 
		}
	}
};