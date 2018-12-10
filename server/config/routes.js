var games = require('../controllers/games.js');

module.exports = function(app) {
    app.get('/checkGame', function(req, res) {
        console.log("Do I Need this?");
    });

    app.get('/visit/:place', function(req, res) {
        games.visitLocale(req, res);
    });

    app.get('/newGame', function(req, res) {
        games.createGame(req, res);
    });

    app.get('/loadGame', function(req, res) {
        games.loadGame(req, res);
    });

    app.get('/getGames', function(req, res) {
        games.getGames(req, res);
    });

    app.get('/removeAllGames', function(req, res) {
        games.removeGames(req, res);
    });
}