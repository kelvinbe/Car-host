// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import excuteQuery from '../../lib/db';
import moment from 'moment';

var serviceAccount = require("../../firebase/serviceAccountkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//   }),
//   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
// });

const firestore = admin.firestore();
const auth = admin.auth();

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

export default async function handler(
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
    return res.status(401).json({ error: error.message });
  }
}
