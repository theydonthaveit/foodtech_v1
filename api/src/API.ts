import * as Hapi from 'hapi'
import * as Hapi_Passport from 'hapi-passport'
import * as Strategy from 'passport-local'
import * as Bcrypt from 'bcrypt'

import Utils from './Utils'


const SERVER = new Hapi().Server

SERVER.connection({
    port: 3000,
    host: 'localhost'
})

SERVER.route({
    method: 'POST',
    path: '/create-profile',
    handler: function (request, reply) {
        Utils.addUserToDatabase(request.payload)
    }
})

SERVER.start((err) => {
    if (err) {
        throw err;
    }

    console.log(`Server running at: ${SERVER.info.uri}`)
})
