import * as Hapi from 'hapi'
// import * as Hapi_Passport from 'hapi-passport'
// import * as Strategy from 'passport-local'

import DBH from './DBH'

const SERVER = new Hapi.Server()

SERVER.connection({
    port: 3000,
    host: 'localhost'
})

SERVER.route({
    method: 'POST',
    path: '/create-profile',
    handler: function (request: any, reply: any) {
        let dbhResp = DBH.addUser(request.payload)
        reply(dbhResp)
    }
})
SERVER.route({
    method: 'POST',
    path: '/add-financial-details',
    handler: function (request: any, reply: any) {
        let dbhResp = DBH.addCardDetails(request.payload)
        reply(dbhResp)
    }
})
SERVER.route({
    method: 'POST',
    path: '/charge-account',
    handler: function (request: any, reply: any) {
        let dbhResp = DBH.chargeAccount(request.payload)
        reply(dbhResp)
    }
})
SERVER.route({
    method: 'POST',
    path: '/invoice-account',
    handler: function (request: any, reply: any) {
        let dbhResp = DBH.chargeAccount(request.payload)
        reply(dbhResp)
    }
})
SERVER.route({
    method: 'POST',
    path: '/order',
    handler: function (request: any, reply: any) {
        let dbhResp = DBH.order(request.payload)
        reply(dbhResp)
    }
})

SERVER.start((err: string) => {
    if (err) {
        throw err;
    }

    console.log(`Server running at: ${SERVER.info.uri}`)
})
