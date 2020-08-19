const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        console.log(req.header('Authorization'));
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, '25252525');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token});

        if(!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        console.log(token);
        next();
    } catch (e) {
        res.status(401).send({error: 'Please authenticate'});
    }
};

module.exports = auth;