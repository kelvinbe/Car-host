// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import excuteQuery from '../../lib/db';
import moment from 'moment';
import { SET_PAYMENT } from '../../mutations'

var serviceAccount = require("../../firebase/serviceAccountkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

type Data = {
  uid?: any,
  error?: string | string[]
}

type Request = {
  req: any
}

/**
 * @swagger
 * /api/setPayment:
 *   post:
 *     description: Set A Payment Method
 *     responses:
 *       200:
 *         description: Set A Payment Method
 */

export default async function handler(
  req: NextApiRequest | any,
  res: NextApiResponse<Data>
) {
  if (!req.headers.token) {
    return res.status(401).json({ error: 'Please include id token' });
  }

  try {
    const { uid } = await auth.verifyIdToken(req.headers.token.split(' ')[1]);
    const result = await excuteQuery({
        query: SET_PAYMENT,
        values: [ 'Active' ],
    });
    //return result[0];
    return result;
    return res.status(200).json({ });
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
}
