const jwt = require('jsonwebtoken');

//receiving a json web token and verifying its validity
module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Not authenticated.')
        error.statusCode = 401
        throw err;
    }
    const token = authHeader.split(' ')[1];

    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'cataclysmiceventinhistory')
    } catch(err){
        err.statusCode = 500;
        throw err;
    }

    if(!decodedToken){
        const error = new Error('Not authenticated.')
        error.statusCode = 401
        throw err;
    }
    req.userId = decodedToken.userId;
    next();
}