import { loadEnv } from './../utils/utils';
const postmark = require("postmark");

const postMartkClient = new postmark.ServerClient(loadEnv("DEV_POSTMARKAPI_KEY") as string);

export default postMartkClient;