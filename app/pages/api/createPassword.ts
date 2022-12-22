import { generateResponseDataTransferObject } from './../../utils/utils';
import { withAuth } from './../../middleware/withAuth';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import excuteQuery from '../../lib/db';
import moment from 'moment';
import { CREATE_PASSWORD } from '../../mutations'

type Data = {
  uid?: any,
  error?: string | string[]
}

type Request = {
  req: any
}

/**
 * @swagger
 * /api/createPassword:
 *   post:
 *     description: Create a password
 *     responses:
 *       200:
 *         description: Create a password
 */

async function handler(
  req: NextApiRequest | any,
  res: NextApiResponse<Data>
) {
  try {
    const result = await excuteQuery({
        query: CREATE_PASSWORD,
        values: [ 'Active' ],
    });
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
