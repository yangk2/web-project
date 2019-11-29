var logger = require('../config/logger').FileLog;
module.exports = (ctx) => {
    let n = ctx.session.cnt || 0;
    //if(n===0)ctx.session.ip = ctx.ip;
    ctx.session.cnt = ++n;
    logger.info(`Ip: ${ctx.ip}, href: ${ctx.href}  , Session: ${JSON.stringify(ctx.session)} `);
    console.log(`Ip: ${ctx.ip}, href: ${ctx.href}  , Session: ${JSON.stringify(ctx.session)} `);
}