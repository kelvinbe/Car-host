import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../../firebase/init.config";
import excuteQuery from "../../../../lib/db";
import { withAuth } from "../../../../middleware/withAuth";
import { withMethod } from "../../../../middleware/withMethod";
import { ADD_STRIPE_CUSTOMER_ID } from "../../../../mutations";
import stripe from "../../../../stripe/init.config";
import { genResponseDto } from "../../../../utils/utils";


function handler(req: NextApiRequest, res: NextApiResponse){
    auth.getUser(req.headers.uid as string).then((user)=>{
        stripe.customers.create({
            email: user.email,
            name: user.displayName,
            description: "divvly customer",
            phone: user.phoneNumber,
            metadata: {
                uid: user.uid
            }
        }).then((customer)=>{
            excuteQuery({
                query: ADD_STRIPE_CUSTOMER_ID,
                values: [customer.id, req.headers.uid as string]
            }).then(()=>{
                res.status(200).send(genResponseDto("success", customer, "Customer created"))
            }).catch((e)=>{
                res.status(500).send(genResponseDto("error", e, "Error creating customer"))
            })
        }).catch((e)=>{
            res.status(400).send(genResponseDto("error", e, "Error creating customer"))
        })
    }).catch((e)=>{
        res.status(400).send(genResponseDto("error", e, "Error creating customer"))
    })
}

export default withMethod(withAuth(handler), "post")


export const config = {
    api: {
        externalResolver: true,
    }
}