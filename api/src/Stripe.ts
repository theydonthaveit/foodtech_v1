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
    addCardDetails(cardDetails: any): Promise<any> {
        let resp
        
        STRIPE.customers.createSource(
            cardDetails.stripe_id, {
                source: {
                    object: "card",
                    exp_month: cardDetails.exp_month,
                    exp_year: cardDetails.exp_year,
                    number: cardDetails.card_num,
                    currency: cardDetails.card_currency,
                    cvc: cardDetails.cvc
                }
            }
        ).then((response) => {
            resp = response
        }).catch((err) => {
            resp = err
        })

        return resp
    },
    chargeAccount( chargeDetails: any ): Promise<any> {
        // TODO
        // Database linked based on orders
        return STRIPE.charges.create({
            amount: chargeDetails.amount,
            currency: chargeDetails.currency,
            customer: chargeDetails.customer_id
        }).then((response) => {
            // TODO: LOG success message to account
            console.log(response)
        }).catch((err) => {
            // TODO: LOG fail message to account
            console.log(err)
        })
    },
    invoiceAccount( customer: any ): Promise<any> {
        // TODO
        // Database linked based on orders
        return STRIPE.invoices.create({
            customer: customer.customer_id,
            currency: customer.location,
            billing: 'charge_automatically'
        }).then((response) => {
            // TODO: LOG success message to account
            console.log(response)
        }).catch((err) => {
            // TODO: LOG fail message to account
            console.log(err)
        })
    }
}