import { genResponseDto } from './../../utils/utils';
import { withAuth } from './../../middleware/withAuth';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import excuteQuery from '../../lib/db';
import moment from 'moment';
import { ADD_CARD } from '../../mutations'


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
  excuteQuery({
    query: ADD_CARD,
    values: [ 'Active' ],
  }).then((data)=>{
    res.status(200).json(data as any)
  }).catch((e)=>{
    var response = genResponseDto("error", e, "Error adding card");
    res.status(500).json(response as any)
  })
}

export default withAuth(handler)


export const config = {
  api: {
      externalResolver: true
  }
}
