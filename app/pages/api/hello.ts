import { genResponseDto } from './../../utils/utils';
import { withAuth } from './../../middleware/withAuth';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as admin from 'firebase-admin';

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
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */

async function handler(
  req: NextApiRequest | any,
  res: NextApiResponse<Data>
) {
  try {
    return res.status(200).json({ });
  } catch (error: any) {
    return res.status(500).json(genResponseDto("error", error, "Error getting user") as any);
  }
}


export default withAuth(handler)

export const config = {
  api: {
      externalResolver: true
  }
}