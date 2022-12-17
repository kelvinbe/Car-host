import { genResponseDto } from './../../../../utils/utils';
import { IPaymentIntentRequest } from './../../../../globaltypes';
import { withMethod } from './../../../../middleware/withMethod';
import { withAuth } from './../../../../middleware/withAuth';
import { NextApiRequest, NextApiResponse } from 'next';
import stripe from '../../../../stripe/init.config';


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { stripeCustomerId, hourlyRate, hours, stripePaymentMethodId, currency } = req.body as IPaymentIntentRequest 
    console.log(req.body)
    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: stripeCustomerId},
        {apiVersion: "2022-11-15"}
      );
    stripe.paymentIntents.create({
        amount: hourlyRate * hours * 100,
        currency: "usd",
        customer: stripeCustomerId,
        payment_method: stripePaymentMethodId,
        automatic_payment_methods: {
            enabled: true
        },
    }).then((paymentIntent)=>{
        res.status(200).send(genResponseDto("success", {
            ...paymentIntent,
            ephemeralKey: ephemeralKey.secret
        }, "Payment intent created"))
    }).catch((e)=>{
        console.log(e)
        res.status(500).send(genResponseDto("error", e, "Error creating payment intent"))
    })
}

export default withMethod(withAuth(handler), "post")

export const config = {
    api: {
        externalResolver: true,
    }
}