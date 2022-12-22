import { generateResponseDataTransferObject } from './../../../utils/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '../../../middleware/withAuth';
import { withMethod } from '../../../middleware/withMethod';

// an array of longitudes and latitudes for a road with incrementing values
const locations: [number, number][] = [
    [37.1, 0.1],
    [37.2, 0.2],
    [37.3, 0.3],
    [37.4, 0.4],
    [37.5, 0.5],
    [37.6, 0.6],
    [37.7, 0.7],
    [37.8, 0.8],
    [37.9, 0.9],
    [38, 1]
]


function handler (req: NextApiRequest, res: NextApiResponse) {
    const { vehicleId } = req.query
    /**
     * @todo add logic to get the actual location from the db
     * 
     */

    res.status(200).send(generateResponseDataTransferObject("success", {
        vehicleId,
        longitude: locations?.[
            Math.floor(Math.random() * locations.length)
        ]?.[0],
        latitude: locations?.[
            Math.floor(Math.random() * locations.length)
        ]?.[1],
    },
    "locations fetched successfully")
    )
}

export default withAuth(withMethod(handler, 'GET'))

export const config = {
    api: {
        externalResolver: true
    }
}