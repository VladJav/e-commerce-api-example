const mongoose = require('mongoose');

const connect = (path) =>{
    return mongoose.connect(path);
};

module.exports = connect;