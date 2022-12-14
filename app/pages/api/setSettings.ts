import { genResponseDto } from './../../utils/utils';
import { withAuth } from './../../middleware/withAuth';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import excuteQuery from '../../lib/db';
import moment from 'moment';
import { SET_SETTINGS } from '../../mutations'


type Data = {
  uid?: any,
  error?: string | string[]
}

type Request = {
  req: any
}

/**
 * @swagger
 * /api/setSettings:
 *   put:
 *     description: Update Settings
 *     responses:
 *       200:
 *         description: Update Settings
 */

async function handler(
  req: NextApiRequest | any,
  res: NextApiResponse<Data>
) {
 

  try {
    const result = await excuteQuery({
        query: SET_SETTINGS,
        values: [ 'Active' ],
    });
    //return result[0];
    return res.status(200).json({ });
  } catch (error: any) {
    return res.status(500).json(genResponseDto("error", error, "Error updating settings") as any);
  }
}

export default withAuth(handler)

export const config = {
  api: {
      externalResolver: true
  }
}
