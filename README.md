# SSEBot

## Running locally

Create a `.env` file and populate it with 
```
SLACK_SIGNING_SECRET=<>
SLACK_BOT_TOKEN=<>
```

You'll want to create a personal slack workspace to do your testing in. In addition, install [ngrok](https://ngrok.com/) or something similar to send requests to your local environment. 

[Local development with ngrok](https://api.slack.com/tutorials/tunneling-with-ngrok)

Start ngrok: `./ngrok http 3000`
