import { Packet } from '_debugger';
import { unescape } from 'querystring';
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
    'User', {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true
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

const MENU_ITEMS = SEQUELIZE.define(
    'MenuItems', {
        resturant_id: {
            type: Sequelize.INTEGER,
            unique: true
        },
        itemName: {
            type: Sequelize.STRING
        },
        ingredients: {
            type: Sequelize.JSON
        },
        allergies: {
            type: Sequelize.JSON
        },
        customizable: {
            type: Sequelize.BOOLEAN
        },
        substitutes: {
            // TODO
            // Could be an associations table
            type: Sequelize.JSON
        },
        ingredientChanges: {
            type: Sequelize.JSON
        },
        itemStatus: {
            type: Sequelize.STRING
        }
    }
)

// const MENUS = SEQUELIZE.define(
//     'Menus', {
//         name: {
//             type: Sequelize.STRING
//         },
//         live: {
//             type: Sequelize.BOOLEAN
//         },
//         resturant_id: {
//             type: Sequelize.INTEGER
//         },
//         menu: {
//             type: Sequelize.JSON
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

export default { USER, ORDERS, MENU_ITEMS }