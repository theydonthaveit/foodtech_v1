import * as Sequelize from 'sequelize';

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
)

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
        },
        order_id: {
            type: Sequelize.INTEGER
        }
    }
)

// const RESTURANT = SEQUELIZE.define(
//     'Resturants', {
//         name: {
//             type: Sequelize.STRING
//         },
//         location: {
//             type: Sequelize.STRING
//         },
//         seating: {
//             type: Sequelize.INTEGER
//         }
//     }
// )

const ORDERS = SEQUELIZE.define(
    'Orders', {
        user_id: {
            type: Sequelize.INTEGER
        },
        resturant_id: {
            type: Sequelize.INTEGER
        },
        items: {
            type: Sequelize.JSON
        },
        value: {
            type: Sequelize.INTEGER
        },
        paid: {
            type: Sequelize.BOOLEAN
        }
    }
)

export default { USER, ORDERS }