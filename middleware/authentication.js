const { isTokenValid } = require('../utils');
const { UnauthorizedError, UnauthenticatedError } = require('../errors');

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;

    if(!token){
        throw new UnauthenticatedError('Authentication Invalid');
    }

    try{
        const payload = isTokenValid(token);
        req.user = {
            role:payload.role,
            name: payload.name,
            userId: payload.userId,
        }
        next();
    }
    catch (e){
        throw new UnauthenticatedError('Authentication Invalid');
    }

};

const authorizePermissions = (...roles) => {
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            throw UnauthorizedError('Access denied');
        }
        next();
    };
};

module.exports = {
    authorizePermissions,
    authenticateUser,
};