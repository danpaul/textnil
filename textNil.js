exports.responseCallback = function(res){
	return function(err, record){
		if(err){ console.log(err);
		} else { 
console.log(record);
			res.send(record); 
		}
	}
};