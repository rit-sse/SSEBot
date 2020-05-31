import { App } from '@slack/bolt';
import { getHelp } from './commands/help';
import { sample } from "./commands/sample";
// load in .env for local dev
import * as dotenv from 'dotenv';
import { welcomeMessage } from "./welcomeMessage";

dotenv.config();

const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
});

(async () => {
    await app.start(process.env.PORT || 3000);
    console.log(`SSEBot started at ${new Date().toUTCString()} (UTC)`);
})();

// when a new user joins
app.event('team_join', async ({ event, context }) => {
    // @ts-ignore
    console.log(`Sending welcome message to ${event.user.id}`);
    await app.client.chat.postMessage({
        token: context.botToken,
        // @ts-ignore
        channel: event.user.id,
        text: welcomeMessage
    });
});

// for @bot messages
app.event('app_mention', async ({ event, context }) => {
    try {
        const args = event.text.split(/\s+/);
        if (!args[1]) {
            console.debug(`App invoked with no command`);
            return;
        }
        const response = await handle(args[1], args.slice(2), event.channel, event.user);
        await app.client.chat.postMessage({
            token: context.botToken,
            channel: event.channel,
            text: response
        });
    } catch (error) {
        console.error(error);
    }
});

// for slash commands
app.command('/ssebot', async ({ command, ack, say }) => {
    await ack();  // Acknowledge command request
    const args = command.text.split(/\s+/);
    if (!args[0]) {
        console.debug(`App invoked with no command`);
        return;
    }
    await say(await handle(args[0], args.slice(1), command.channel_id, command.user_id));
});

/**
 * Handle all supported commands
 * Abstracted here since there are multiple entry points
 */
async function handle(command, args, channel, user) {
    try {
        switch (command) {
            case "sample":
                return sample();

            case "help":
                return getHelp();
        }

        return "That command was not recognized.";
    } catch (err) {
        console.error(err);
        return "There was an error processing your request.";
    }
}
