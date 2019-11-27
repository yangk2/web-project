const Router = require('koa-router');
var logger = require('../config/logger').FileLog;

const api = new Router();

api.get('/books', (ctx, next) => {
    logger.info("2");
    ctx.body = 'GET ' + ctx.request.path;
});

module.exports = api;