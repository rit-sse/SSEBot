import { createHmac } from 'crypto';
import * as superagent from 'superagent';
// load in .env for local dev
import * as dotenv from 'dotenv';
import { mentionReq, slashReq } from "../testData/slack";

dotenv.config();

const botToken = process.env.SLACK_BOT_TOKEN;
const signingSecret = process.env.SLACK_SIGNING_SECRET;
const eventsUrl = `http://localhost:3000/slack/events`;
const headers = {
    Authorization: `Bearer ${botToken}`,
    'Content-type': 'application/json',
    'x-slack-request-timestamp': '', // you must set this in each test with the request body for requests to work
    'x-slack-signature': '' // you must set this in each test with the request body for requests to work
};

/**
 * Creates the slack signature needed to mock requests
 */
function generateSlackSignature(secret, timestamp, body) {
    const base = 'v0:' + timestamp + ':' + body;
    return 'v0=' + createHmac('SHA256', secret).update(base, 'utf8').digest('hex');
}

/**
 * Send a mock message "from slack" to the bolt app
 */
export function sendMockSlackMessage(data) {
    if (typeof data != 'string') {
        data = JSON.stringify(data);
    }

    const now = Date.now();
    headers['x-slack-request-timestamp'] = String(now);
    headers['x-slack-signature'] = generateSlackSignature(signingSecret, now, data);

    return superagent.post(eventsUrl)
        .set(headers)
        .send(data);
}

/**
 * Mock the request data used to send a message
 */
export function mockRequest(port: number, message: string, isMention: boolean = false) {
    return isMention ? mentionReq(port, message) : slashReq(port, message);
}
