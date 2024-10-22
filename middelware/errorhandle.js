const {constants} = require ("../constants")
const errorhandle = (err, req, res, next) => {
    
    const statuscode = res.statuscode ? res.statuscode : 500;
    switch(statuscode) {
        case constants.UNAUTHORIZED : 
            res.json({
                title : "UnAuthorized Error",
                message : err.message,
                stackTrace : err.stack,
            });
            // break;
        case constants.VALIDATION_ERROR : 
            res.json({
                title : "Validation Error",
                message  : err.message,
                stackTrace : err.stack,
            });
            // break;
        case constants.NOT_FOUND :
            res.json({
                title : "Page Not Found",
                message : err.message,
                stackTrace : err.stack,
            });
            // break;
        case constants.SERVER_ERROR : 
            res.json({
                title : "Server Error",
                message : err.message,
                stackTrace : err.stack,
            })
            // break;
        default:
            
    }
    
}

module.exports = errorhandle;