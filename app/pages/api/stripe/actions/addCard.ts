import { generateResponseDataTransferObject } from '../../../../utils/utils';
import { withAuth } from '../../../../middleware/withAuth';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import excuteQuery from '../../../../lib/db';
import moment from 'moment';
import { ADD_CARD } from '../../../../mutations'
import stripe from '../../../../stripe/init.config';
import { IRawCard } from '../../../../globaltypes';


type Data = {
  uid?: any,
  name?: string | string[],
  email?: string,
  picture?: string,
  error?: string | string[]
}

type Request = {
  req: any
}

/**
 * @swagger
 * /api/addCard:
 *   post:
 *     description: Adds a credit card
 *     responses:
 *       200:
 *         description: hello world
 */

export function handler(
  req: NextApiRequest | any,
  res: NextApiResponse<Data>
) {
  const { cardNumber, cvc, email, expMonth, expYear, name } = req.body as IRawCard & { stripeCustomerId: string }
  stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: cardNumber,
      exp_month: expMonth,
      exp_year: expYear,
      cvc: cvc,
    },
    billing_details: {
      name: name,
      email: email,
    }
  }).then((pm)=>{
    stripe.paymentMethods.attach(pm.id, {
      customer: req.body.stripeCustomerId
    }).then((pm)=>{
      excuteQuery({
        query: ADD_CARD,
        values: [ 'Active' ],
      }).then((data)=>{
        res.status(200).json(data as any)
      }).catch((e)=>{
        var response = generateResponseDataTransferObject("error", e, "Error adding card");
        res.status(500).json(response as any)
      })
    }).catch((e)=>{
      res.status(500).send(generateResponseDataTransferObject("error", e, "Error adding card") as any)
    })
  }).catch((e)=>{
    console.log(e)
    res.status(500).send(generateResponseDataTransferObject("error", e, "Error adding card") as any)
  })

  
}

export default withAuth(handler)


export const config = {
  api: {
      externalResolver: true
  }
}
