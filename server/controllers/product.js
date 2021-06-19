const Product = require('../../database/models/Product.js');

exports.getProducts = (req, res) => {

  Product.find({}).exec(function(error, data) {

        if (error) {

            res.status(404).send()
        } else {

            res.send(data)
        }
    })
};

exports.addLike = (req, res) => {

    Product.findOneAndUpdate({ asin: req.body.asin }, { $inc: { votes: 1 }}, { upsert: true })
    .exec(function(error, data) {

        if (error) {

            res.status(404).send()
        } else {

            res.send(data)
        }
    })
  };

