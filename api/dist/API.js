"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hapi = require("hapi");
// import * as Hapi_Passport from 'hapi-passport'
// import * as Strategy from 'passport-local'
const DBH_1 = require("./DBH");
const SERVER = new Hapi().Server;
SERVER.connection({
    port: 3000,
    host: 'localhost'
});
SERVER.route({
    method: 'POST',
    path: '/create-profile',
    handler: function (request, reply) {
        let dbhResp = DBH_1.default.addUser(request.payload);
        reply(dbhResp);
    }
});
SERVER.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${SERVER.info.uri}`);
});
//# sourceMappingURL=API.js.map