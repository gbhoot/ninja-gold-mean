var Game = require('../models/game.js');

module.exports = {
    createGame: function(req, res) {
        let game = new Game();
        game.save(function(error, game) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                req.session.gid = game._id;
                let response = {
                    message: "Success",
                    game: game
                };
                res.json(response);
            }
        });
    },

    loadGame: function(req, res) {
        console.log(req.session['gid']);
        if (req.session['gid']) {
            let gid = req.session.gid
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
        } else {
            console.log("Getting failured");
            let response = {
                message: "Failure"
            }
            res.json(response);
        }
    },

    visitLocale: function(req, res) {
        let locale = req.params['place'];
        let gid = req.session['gid'];
        console.log(gid);
        let new_gold = 0;
        switch (locale) {
            case "farm":
                new_gold = Math.floor(Math.random() * 4) + 2;
                break;
            case "cave":
                new_gold = Math.floor(Math.random() * 6) + 5;
                break;
            case "house":
                new_gold = Math.floor(Math.random() * 9) + 7;
                break;
            case "casino":
                new_gold = Math.floor(Math.random() * 101);
                new_gold *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
                break;
            default:
                break;
        };
        let status = "earned";
        if (new_gold < 0) {
            status = "lost";
        }
        let activity = ("You "+ status +" "+ Math.abs(new_gold) +" gold at "+
        "the "+ locale);
        Game.updateOne({_id: gid}, {$inc: {gold: new_gold}, 
            $push: {activities: activity}}, 
            function(error, response) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                Game.find({_id: gid}, function(error, game) {
                    console.log(game);
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
            }
        });
    },

    getGames: function(req, res) {
        Game.find({$query: {}, $orderby: {gold: -1}}, function(error, games) {
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
    },

    removeGames: function(req, res) {
        Game.remove({}, function(error) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success"
                };
                res.json(response);
            }
        })
    }
}