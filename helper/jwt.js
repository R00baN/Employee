const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.SECRET || 'akatshki';
    
    return expressJwt({
        secret,
        algorithms: ['HS256'],
       
    }).unless({
        path: [
            // {url: /\/post(.*)/ , methods: ['GET', 'OPTIONS'] },ß
            {url: `/login`}
        ]
    })
}

module.exports = authJwt