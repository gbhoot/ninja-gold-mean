var mongoose = require('../config/mongoose.js');
var GameSchema = new mongoose.Schema({
    gold: {type: Number, default: 0},
    activities: {type: [String]}
}, {timestamps: true});

var Games = mongoose.model('Game', GameSchema);

module.exports = Games;