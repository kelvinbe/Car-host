import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../firebase/init.config';


export const withAuth = (handler: (req: NextApiRequest, res: NextApiResponse)=> void) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (!req.headers.token) {
            return res.status(401).json({ error: 'Please include id token' });
        }
        
        auth.verifyIdToken(((req.headers.token as string)?.split(" ")?.[1] as string)).then((decodedToken) => {
            req.headers.uid = decodedToken.uid;
            return handler(req, res);
        }).catch((e)=>{
            console.log(e)
            return res.status(401).json({ error: e.message });
        })
    }
}