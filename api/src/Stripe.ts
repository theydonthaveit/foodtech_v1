import * as SP from 'stripe'

const STRIPE = SP('sk_test_edFqhGjHMIQrhYvbYm7KOk0U')

export default {
    createAccount(email: string): Promise<any> {
        let customerAcc
        
        try {
            customerAcc = STRIPE.customers.create({
                email: email
            })

            return customerAcc
        }
        catch(err) {
            return err
        }
    },
    addCardDetails(payload: any): Promise<any> {
        STRIPE.customers.createSource(
            payload.stripe_id,
            {
                object: "card",
                exp_month: payload.exp_month,
                exp_year: payload.exp_year,
                number: payload.card_num,
                currency: payload.card_currency,
                cvc: payload.cvc
            }, function(err, card) {
                if(err) {
                    console.log('bad')
                }
                else {
                    console.log(card)
                }
            }
        );
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