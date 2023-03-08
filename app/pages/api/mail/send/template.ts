import { loadEnv, generateResponseDataTransferObject } from './../../../../utils/utils';
import { withAuth } from './../../../../middleware/withAuth';
import { NextApiRequest, NextApiResponse } from "next";
import postMartkClient from '../../../../postmark/init.config';

interface reqBody {
    template: string,
    data: {
        [key: string]: string
    },
    to: string,
}

function handler(
    req: NextApiRequest | any,
    res: NextApiResponse
) {
    const { to, template, data } = req.body as reqBody;

    postMartkClient.sendEmailWithTemplate({
        From: loadEnv('SUPPORT_EMAIL'),
        To: to,
        TemplateAlias: template,
        TemplateModel: {
            ...data
        },
        MessageStream: "outbound"
    }).then((msgRes:object)=>{
        console.log(msgRes);
        res.status(200).json(generateResponseDataTransferObject("success", msgRes, "Email sent successfully"))
    }).catch((e:object)=>{
        console.log(e);
        res.status(500).json(generateResponseDataTransferObject("error", e, "Error sending email"))
    })

}

export const config = {
    api: {
        externalResolver: true
    }
}

export default withAuth(handler)