const express = require('express');
const helpers = require('./helpers');
const errors = require('./errors');

const app = express();



app.use(express.json());

app.get('/mean', function(req, res, next) {
    try {
        nums = helpers.numStringToIntArray(req.query.nums);
        if (nums) {
        return res.send(helpers.generateResponse('mean',nums));
        }
        throw new errors.ExpressError('Issue with number string format', 400);
    } catch (err) {
        return next(err);
    }
})

app.get('/median', function(req, res, next) {
    try{
        nums = helpers.numStringToIntArray(req.query.nums);
        if (!nums) {
            throw new errors.ExpressError('Issue with number string format', 400);
        }
        return res.send(helpers.generateResponse('median',nums));
    } catch(err) {
        return next(err);
    }

})

app.get('/mode', function(req, res, next) {
    try {
        nums = helpers.numStringToIntArray(req.query.nums);
        if (!nums) {
            throw new errors.ExpressError('Issue with number string format', 400);
        }
        return res.send(helpers.generateResponse('mode', nums));
    } catch(err) {
        return next(err);
    }
})

app.use(function(err, req, res, next) {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({
        error: {message, status}
    });
});

app.listen(3000, function() {
    console.log("Server running on port 3000");
})