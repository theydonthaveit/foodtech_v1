import * as SP from 'stripe'

const STRIPE = SP('sk_test_edFqhGjHMIQrhYvbYm7KOk0U')

export default {
    createAccount( email: string ) {
        STRIPE.customers.create({
            email: email
        }, function(err, customer) {
            return customer
        })
    }

// public addFinancialDetials( financeDetails: any ): void  {
//     return this.STRIPE.customers.createSource( financeDetails.customer_id, {
//         source: {
//             object: financeDetails.type,
//             exp_month: financeDetails.exp_month,
//             exp_year: financeDetails.exp_year,
//             number: financeDetails.number,
//             cvc: financeDetails.cvc
//         }
//     }).then(function(response){
//         // TODO: Log success message of account creation
//     }).catch(function(err){
//         // TODO: LOG fail message
//     })
// }

// public chargeAccount( chargeDetails: any ): void {
//     return this.STRIPE.charges.create({
//         amount: chargeDetails.amount,
//         currency: chargeDetails.currency,
//         customer: chargeDetails.customer_id
//     }).then( function(response) {
//         // TODO: LOG success message to account
//         console.log(response)
//     }).catch( function(err) {
//         // TODO: LOG fail message to account
//         console.log(err)
//     })
// }
// }
}