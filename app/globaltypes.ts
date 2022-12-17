// Static props

export interface IStaticProps {
    dashboard?: boolean;
    authonly?: boolean;
    adminonly?: boolean;
}


/**
 * @section Request Objects
 */

export interface IRawCard {
    cardNumber: string,
    expMonth: number,
    expYear: number,
    cvc: string,
    name: string,
    email: string,
}

export interface IPaymentIntentRequest {
    hourlyRate: number,
    hours: number,
    stripeCustomerId: string,
    stripePaymentMethodId: string,
    currency: string
}