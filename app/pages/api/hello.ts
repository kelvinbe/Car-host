// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as admin from 'firebase-admin';

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
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */

export default async function handler(
  req: NextApiRequest | any,
  res: NextApiResponse<Data>
) {
  if (!req.headers.token) {
    return res.status(401).json({ error: 'Please include id token' });
  }

  try {

    const { uid, name, email, picture } = await auth.verifyIdToken(req.headers.token.split(' ')[1]);
    return res.status(200).json({ uid, name, email, picture });
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
}
