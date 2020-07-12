const express = require('express');
const app = express();
const morgan = require('morgan');
const knex = require('./Config/database');

// Apps/Routers
const UserRouter = require('./Router/User.router');

app.disable('x-powered-by');
app.disable('X-Powered-By');

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/api/test', function(req, res){
    res.json({data: [1,2,3,4,5]});
})
app.use('/api/user', UserRouter);


module.exports = app
