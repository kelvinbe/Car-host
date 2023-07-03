import { NextApiHandler } from "next"
import axios from 'axios'

const handler: NextApiHandler = async (req, res) => {
    console.log("Current env::", process.env.NEXT_PUBLIC_API_DOMAIN) // useful for debugging
    const method = req.method 
    switch (method){
        case "POST": {
            
            const body = req.body
            try {
                const axios_res = await axios.post(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/webhooks/mtn/disbursement`, body)
                console.log("Axios Rexponse:: ", axios_res.data)
                return res.status(200).send("Ok") 
            } catch (e) {
                console.log(e) // useful error to log 
                return res.status(200).send("Ok") // the webhook originator does not care about the response
            }
        };
        default:{
            return res.status(405).send("Method not allowed")
        }
    }

}


export default handler 