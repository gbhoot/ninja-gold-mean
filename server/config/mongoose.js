var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ninja_gold');

module.exports = mongoose;