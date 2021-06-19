const User = require('../../database/models/User.js');

exports.getUsers = (req, res) => {

    User.find({}).exec(function(error, data) {

        if (error) {

            res.status(404).send()
        } else {

            res.send(data)
        }
    })
};

exports.loginUser = (req, res) => {

    User.exists({ email: req.params.email, userPassword: req.params.userPassword}, function(error, data) {

        if (error) {

            console.log(error)
            res.status(404).send()
        } else {

            res.send(data)
        }
    })
};

exports.addUser = (req, res) => {

    var newUser = new User(req.body);

    newUser.save(function(error, data) {

        if (error) {

            res.status(404).send()
        } else {

            res.send(data)
        }
    })
};
