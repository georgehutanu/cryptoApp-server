import jwt from "express-jwt"
import jwks from "jwks-rsa"


export default jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-zavyeazj.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'localhost:4000',
    issuer: 'https://dev-zavyeazj.us.auth0.com/',
    algorithms: ['RS256']
})