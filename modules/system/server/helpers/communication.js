// Communication helper

module.exports = function(System){
	var communication = {},
		helper = {};

	communication.common = function(status, res, json, message){
		var response = {
			status: status,
			json: json,
			message: message
		};
		res.send(response);
	}

	communication.success = function(res, json, message){
		communication.common(1, res, json, message);
	}

	communication.fail = function(res, message){
		communication.common(0, res, null, message);
	}

	helper = {
		module: communication,
		key: 'communication'
	};

	return helper;
}