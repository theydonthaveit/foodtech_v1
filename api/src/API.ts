import * as Hapi from 'hapi'
// import * as Hapi_Passport from 'hapi-passport'
// import * as Strategy from 'passport-local'

import DBH from './DBH'

const SERVER = new Hapi.Server()

SERVER.connection({
    port: 3000,
    host: 'localhost'
})

SERVER.state('session', {
    ttl: 4 * 60 * 60 * 1000,
    isSecure: true,
    path: '/',
    password: '$2a$10$ox1eYikSaK/6ELiX/pn2s.44g9xCLuMYZJCp7/j9UwMeO8qLBstoO',
    encoding: 'iron'
})

SERVER.on('request-internal', (request, event, tags) => {
    if (tags.error && tags.state) {
        // TODO
        // LOG to monitor and send users the error
        console.error(event);
    }
})

SERVER.route({
    method: 'GET',
    path: '/',
    handler: function(req: any, res: any) {
        let session = req.state.session;
        if (!session) {
            session = { user: 'Alan' };
        }
    
        session.last = Date.now();
        console.log(session)
        return res('Success').state('session', session);
    }
})
SERVER.route({
    method: 'GET',
    path: '/retrieve-menu',
    handler: function(req: any, res: any) {
        // TODO
        // db query to retrieve the active items for a resturant
    }
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
        // TODO
        // NEEDS to update an order paid status
        let dbhResp = DBH.chargeAccount(request.payload)
        reply(dbhResp)
    }
})
SERVER.route({
    method: 'POST',
    path: '/invoice-account',
    handler: function (request: any, reply: any) {
        // TODO
        // HAS ISSUES
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
SERVER.route({
    method: 'POST',
    path: '/add-items',
    handler: function (request: any, reply: any) {
        let dbhResp = DBH.addMenuItems(request.payload)
        reply(dbhResp)
    }
})
SERVER.route({
    method: 'POST',
    path: '/set-menu',
    handler:function (request: any, reply: any) {
        // TODO
        // set which items will be active that day
    }
})

SERVER.start((err: string) => {
    if (err) {
        throw err;
    }

    console.log(`Server running at: ${SERVER.info.uri}`)
})
