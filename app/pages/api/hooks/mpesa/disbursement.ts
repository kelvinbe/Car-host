import { NextApiHandler } from "next"
import axios from 'axios'

const handler: NextApiHandler = async (req, res) => {

    const method = req.method 
    switch (method){
        case "POST": {
            res.status(200).send("Ok")
            const body = req.body
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/webhooks/mpesa/payout`, body)
            } catch (e) {
                console.log(e) // useful error to log 
            }
            break;
        };
        default:{
            return res.status(405).send("Method not allowed")
        }
    }

}


export default handler 