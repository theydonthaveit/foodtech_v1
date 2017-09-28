import Utils from './utils'
import Stripe from './Stripe'
import Models from './models'

export default {
    addUser: async function(payload: any) {
        let bcryptPassword = await Utils.genPassword(payload.password)
        let stripe = await Stripe.createAccount(payload.email)

        Models.USER.sync({force: true}).then(() => {
            // Table created
            return Models.USER.create({
                firstname: payload.firstname,
                lastname: payload.lastname,
                email: payload.email,
                password: bcryptPassword,
                stripe_id: stripe.id
            });
        });
    },
    addCardDetails: async function(cardDetails: any) {
        await Stripe.addCardDetails(cardDetails)
    },
    chargeAccount: async function(chargeDetails: any) {
        // TODO
        // Database linked based on orders
        // update order table with paid status / disputed / etc
        await Stripe.chargeAccount(chargeDetails)
    },
    invoiceAccount: async function(customer: any) {
        // TODO
        // Database linked based on orders
        await Stripe.invoiceAccount(customer)
    },
    order(orderDetails: any) {
        Models.ORDERS.sync({force: true}).then(() => {
            // Table created
            return Models.ORDERS.create({
                user_id: orderDetails.user_id,
                resturant_id: orderDetails.resturant_id,
                items: orderDetails.items,
                value: orderDetails.value,
                paid: orderDetails.paid
            })
        })
    }
}