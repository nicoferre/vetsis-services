function ErrorUtils() {

	this.buildErrorResponse = function(code, message) {
		var errorDetail = {code: code, message: message};
     	return  {error: errorDetail};
	};

	this.buildErrorResponseForError = function(code,error) {
	    return this.buildErrorResponse(code);
	};
};

var errorUtils = new ErrorUtils();

module.exports = errorUtils;
