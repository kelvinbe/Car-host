import { generateResponseDataTransferObject } from './../../utils/utils';
import { withAuth } from './../../middleware/withAuth';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import excuteQuery from '../../lib/db';
import moment from 'moment';
import { FETCH_DATA } from '../../queries'

type Data = {
  uid?: any,
  error?: string | string[]
}

type Request = {
  req: any
}

/**
 * @swagger
 * /api/initial:
 *   get:
 *     description: Inital Data Load
 *     responses:
 *       200:
 *         description: Initial Data Load
 */

async function handler(
  req: NextApiRequest | any,
  res: NextApiResponse<Data>
) {

  try {
    const result = await excuteQuery({
        query: FETCH_DATA,
        values: [ 'Active' ],
    });
    //return result[0];
    return res.status(200).json({ });
  } catch (error: any) {
    return res.status(500).json(generateResponseDataTransferObject("error", error, "Error creating password") as any);
  }
}

export default withAuth(handler)

export const config = {
  api: {
      externalResolver: true
  }
}
