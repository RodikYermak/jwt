const ApiError = require('../exceptions/api-error');

module.exports = function (err, req, res, next) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    let status = err.status || 500;
    let message = err.message || 'Something went wrong';
    return res.status(status).json({ message });
};
