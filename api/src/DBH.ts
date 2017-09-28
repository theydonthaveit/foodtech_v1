import * as console from 'console';
import * as Sequelize from 'sequelize';
import * as Bcrypt from 'bcrypt';

import Stripe from './Stripe'

const SEQUELIZE = new Sequelize(
    'foodtech',
    'root',
    'blank', {
        host: 'localhost',
        dialect: 'mysql',

        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    }
);

const USER = SEQUELIZE.define(
    'Users', {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        stripe_id: {
            type: Sequelize.STRING
        }
    }
);

export default {
    addUser: async function(payload: any) {
        // TODO
        // bcrypt in own file
        let bcryptPassword
        let encryptPassword: string
        let saltRounds: number = 10

        Bcrypt.genSalt(saltRounds, function(err, salt) {
            Bcrypt.hash(payload.password, salt, function(err, hash) {
                encryptPassword = hash
            })
        })

        let stripe = await Stripe.createAccount(payload.email)

        USER.sync({force: true}).then(() => {
            // Table created
            return USER.create({
                firstname: payload.firstname,
                lastname: payload.lastname,
                email: payload.email,
                password: encryptPassword,
                stripe_id: stripe.id
            });
        });
    },
}
