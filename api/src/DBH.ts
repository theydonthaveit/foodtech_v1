import * as Sequelize from 'sequelize';

import Utils from './utils'
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
        let bcryptPassword = await Utils.genPassword(payload.password)
        let stripe = await Stripe.createAccount(payload.email)

        USER.sync({force: true}).then(() => {
            // Table created
            return USER.create({
                firstname: payload.firstname,
                lastname: payload.lastname,
                email: payload.email,
                password: bcryptPassword,
                stripe_id: stripe.id
            });
        });
    },
    addCardDetails: async function(payload: any) {
        await Stripe.addCardDetails(payload)
    }
}