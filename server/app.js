const express = require('express');
const app = express();
const morgan = require('morgan');
const knex = require('./Config/database');

app.disable('x-powered-by');
app.disable('X-Powered-By');

// Apps/Routers

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/api/test', function(req, res){
    knex.select().from('products')
        .then(products => {
            res.status(200).json({data: products});
        });
})


module.exports = app
