import { genResponseDto } from './../../utils/utils';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import excuteQuery from '../../lib/db';
import moment from 'moment';
import { MODIFY_BOOKING } from '../../mutations'
import { withAuth } from '../../middleware/withAuth';

type Data = {
  uid?: any,
  error?: string | string[]
}

type Request = {
  req: any
}

/**
 * @swagger
 * /api/modifyBooking:
 *   put:
 *     description: Modify a booking / reservation
 *     responses:
 *       200:
 *         description: Modify a booking / reservation
 */

async function handler(
  req: NextApiRequest | any,
  res: NextApiResponse<Data>
) {
  try {
    const result = await excuteQuery({
        query: MODIFY_BOOKING,
        values: [ 'Active' ],
    });
    //return result[0];
    return res.status(200).json({ });
  } catch (error: any) {
    return res.status(401).json(genResponseDto("error", error, "Error modifying booking") as any);
  }
}

export default withAuth(handler)

export const config = {
  api: {
      externalResolver: true
  }
}