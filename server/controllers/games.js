var Game = require('../models/game.js');

module.exports = {
    createGame: function(req, res) {
        let game = new Game();
        game.save(function(error, game) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                console.log(game._id);
                let response = {
                    message: "Success",
                    game: game
                };
                res.json(response);
            }
        });
    },

    loadGame: function(req, res) {
        let gid = req.body;
        Game.find({_id: gid}, function(error, game) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    game: game
                };
                res.json(response);
            }
        });
    },

    visitLocale: function(req, res) {
        let locale = req.params['place'];
        let new_gold = 0;
        switch (locale) {
            case "farm":
                new_gold = Math.floor(Math.floor() * 4) + 2;
                break;
            case "cave":
                new_gold = Math.floor(Math.floor() * 6) + 5;
                break;
            case "house":
                new_gold = Math.floor(Math.floor() * 9) + 7;
                break;
            case "casino":
                new_gold = Math.floor(Math.floor() * 51);
                new_gold *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                break;
            default:
                break;
        };
        console.log(new_gold);
    },

    getGames: function(req, res) {
        Game.find({}, function(error, games) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let topGames = games.splice(0, 5);
                let response = {
                    message: "Success",
                    games: topGames
                };
                res.json(response);
            }
        });
    }
}