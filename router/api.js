const Router = require('koa-router');
var logger = require('../config/logger').FileLog;

const api = new Router();

api.get('/books', (ctx, next) => {
    ctx.body = 'GET ' + ctx.request.path;
});

module.exports = api;