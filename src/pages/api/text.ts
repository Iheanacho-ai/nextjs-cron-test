import { NextApiResponse, NextApiRequest } from "next";
const twillio = require('twilio');
const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const myCellPhoneNumber = process.env.MY_NUMBER;
const superSecretAPIKey = 'ABCD1234';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = twillio(accountSid, authToken);
    const auth = req.headers.authorization;
    if (auth === superSecretAPIKey) {
        await client.messages
            .create({
                body: `\n
						Create your todo list the night before with categories: 
						\n- Work 
						\n- Health 
						\n- Relationships 
						\n- Self Improvement 
						\n 
						\n Get better every day: https://nextjs-cron-test.vercel.app/`,
                from: '+12762925601', // my twilio testing number
                to: `+234${myCellPhoneNumber}`
            })
            .then((message: String) => res.json(message), (err: Error) => res.json(err));
    } else {
        return res.status(401).end();
    }
}