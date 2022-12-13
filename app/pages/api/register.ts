// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import excuteQuery from '../../lib/db';
import moment from 'moment';
import { REGISTER } from '../../mutations'

type Data = {
  uid?: any,
  error?: string | string[]
}

type Request = {
  req: any
}

/**
 * @swagger
 * /api/register:
 *   post:
 *     description: Register a user
 *     responses:
 *       200:
 *         description: Register a user
 */

export default async function handler(
  req: NextApiRequest | any,
  res: NextApiResponse<Data>
) {
  try {
    const result = await excuteQuery({
        query: REGISTER,
        values: [ 'Active' ],
    });
    //return result[0];
    return res.status(200).json({ });
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
}

export const config = {
  api: {
      externalResolver: true
  }
}
