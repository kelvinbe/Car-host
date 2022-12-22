import { loadEnv, generateResponseDataTransferObject } from './../../../../utils/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '../../../../middleware/withAuth';
import postMartkClient from '../../../../postmark/init.config';

interface reqBody {
    to: string,
    subject: string,
    htmlBody: string,
    textBody: string,    
}

interface resBody {

}

function handler (req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body)
    const { to, subject, htmlBody, textBody } = req.body as reqBody;
    console.log(htmlBody, textBody)
    postMartkClient.sendEmail({
        From: loadEnv("SUPPORT_EMAIL"),
        To: to,
        Subject: subject,
        HtmlBody: htmlBody,
        TextBody: textBody,
        MessageStream: "outbound"
    }).then((msgRes)=>{
        console.log(msgRes);
        res.status(200).json(generateResponseDataTransferObject("success", msgRes, "Email sent successfully"))
    }).catch((e)=>{
        console.log(e);
        res.status(500).json(generateResponseDataTransferObject("error", e, "Error sending email"))
    })
}

export default withAuth(handler)

export const config = {
    api: {
        externalResolver: true
    }
}