import { genResponseDto } from './../../utils/utils';
import { withAuth } from './../../middleware/withAuth';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import excuteQuery from '../../lib/db';
import moment from 'moment';

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
 * /api/test:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */

 export async function findUser({ email }:{email: string}) {
  try {
    const uid = uuidv4();
    const createdAt = moment().format( 'YYYY-MM-DD HH:mm:ss');
    console.log('UID: ', uid);
    console.log('CreateAt: ', createdAt);
    
      const result = await excuteQuery({
          query: 'SELECT * FROM auth_code WHERE status = ?',
          values: [ 'Active' ],
      });
      //return result[0];
      return result;
  } catch (error) {
      console.log(error);
  }
}

async function handler(
  req: NextApiRequest | any,
  res: NextApiResponse<Data>
) {
  // if (!req.headers.token) {
  //   return res.status(401).json({ error: 'Please include id token' });
  // }

  try {

    //const { uid, name, email, picture } = await auth.verifyIdToken(req.headers.token.split(' ')[1]);

    const user = await findUser({email: 'mike.cox02@gmail.com'});
    console.log('user: ', user);
    return res.status(200).json({ name: 'Mike Cox' });
  } catch (error: any) {
    return res.status(500).json(genResponseDto("error", error, "Error creating password") as any);
  }
}


export default withAuth(handler)

export const config = {
  api: {
      externalResolver: true
  }
}