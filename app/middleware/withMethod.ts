import { upperCase } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

export const withMethod = (handler: (req: NextApiRequest, res: NextApiResponse)=> void, method: string) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (req.method !== upperCase(method)) {
            return res.status(405).json({ error: 'Method not allowed' });
        }
        return handler(req, res);
    }
}