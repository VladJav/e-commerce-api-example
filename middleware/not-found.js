const { NotFoundError } = require('../errors');

const notFoundMiddleware = (req, res, next) =>{
    next(new NotFoundError('Route does not exists'));
};

module.exports = notFoundMiddleware;