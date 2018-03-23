'use strict';

var debug = require('debug')('swagger:json_error_handler');
var util = require('util');
var errorUtils = require('../../utils/errors-util');

module.exports = function create(fittingDef, bagpipes) {

    debug('config: %j', fittingDef);

    return function error_handler(context, next) {

        if (!util.isError(context.error)) { return next(); }

        var err = context.error;
        var log;
        var body;

        debug('exec: %s', context.error.message);

        if (!context.statusCode || context.statusCode < 400) {
            if (context.response && context.response.statusCode && context.response.statusCode >= 400) {
                context.statusCode = context.response.statusCode;
            } else if (err.statusCode && err.statusCode >= 400) {
                context.statusCode = err.statusCode;
                delete(err.statusCode);
            } else {
                context.statusCode = 500;
            }
        }

        try {
            //TODO: find what's throwing here...
            if (context.statusCode === 500 && !fittingDef.handle500Errors) { return next(err); }
            //else - from here we commit to emitting error as JSON, no matter what.
            context.headers['Content-Type'] = 'application/json';
            Object.defineProperty(err, 'message', { enumerable: true });
            // include message property in response
            //Object.defineProperty(err, 'statusCode', { enumerable: true });
            if (fittingDef.includeErrStack)
                Object.defineProperty(err, 'stack', { enumerable: true }); // include stack property in response

            delete(context.error);

            var finalMessage = "";
            var errorsArray = err.errors;
            errorsArray.forEach(function(element){
                var errorsArrayDetail = element.errors;
                errorsArrayDetail.forEach(function(elementError){
                    // When the code is type REQUIRED the most representative message is from the errorsArray object
                    if (elementError.code === "REQUIRED"){
                        finalMessage = finalMessage+" "+ element.message+".";
                    } else {
                        // When defining a description in the configuration yaml
                        if (elementError.description !== undefined) {
                            finalMessage = finalMessage+" "+ elementError.description+ " "+ elementError.message+".";
                        } else {
                            finalMessage = finalMessage+" "+ elementError.message+".";
                        }
                    }

                });
            });

            var errToReturn = errorUtils.buildErrorResponse(context.statusCode,finalMessage);

            next(null, JSON.stringify(errToReturn));
        } catch (err2) {
            log = context.request && (
                    context.request.log
                    || context.request.app && context.request.app.log
                )
                || context.response && context.response.log;

            body = {
                message: "unable to stringify error properly",
                stringifyErr: err2.message,
                originalErrInspect: util.inspect(err)
            };
            context.statusCode = 500;

            debug('jsonErrorHandler unable to stringify error: ', err);
            if (log) log.error(err2, "onError: json_error_handler - unable to stringify error", err);

            next(null, JSON.stringify(body));
        }
    }
};