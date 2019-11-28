//require('dotenv').config();
var config = require('../config/config');
const Koa = require('koa');
const Router = require('koa-router');
const helmet = require("koa-helmet");
const session = require('../config/session');
var logger = require('../config/logger').FileLog;

const app = new Koa();
app.keys = ['noname'];
const router = new Router();
const api = require('../router/api');

const mongoose = require('mongoose');

const requestfilter = require('../filter/requestFilter');

mongoose.Promise = global.Promise; // Node 의 네이티브 Promise 사용
// mongodb 연결
mongoose.connect(config.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: config.user ,
    pass: config.pass
}).then(
    (response) => {
        console.log('Successfully connected to mongodb');
    }
).catch(e => {
    console.error(e);
});

const port = process.env.PORT || 4000; // PORT 값이 설정되어있지 않다면 4000 을 사용합니다.

app.use(helmet());
app.use(session(app));
app.use(async (ctx, next) => {requestfilter(ctx); next();});
app.use(router.routes()).use(router.allowedMethods());
router.use('/api', api.routes()); // api 라우트를 /api 경로 하위 라우트로 설정

app.listen(port, () => {
    console.log('mainnet server is listening to port ' + port);
});