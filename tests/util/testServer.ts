import * as express from 'express';

export let responseFromBolt;
export let server;

/**
 * Start up an express app to get the response sent to "slack" via the request's response_url
 * in the res body, set "response_url": "http://localhost:5000/"
 */
export function startResponseServer() {
    const app = express();
    app.use(express.json());
    app.use('/', express.Router().post('/', function (req, res, next) {
        responseFromBolt = req;
    }));
    app.set('port', 0);
    server = app.listen(0, () => {
    });
}

/**
 * Stop the server to free up the port
 * Clear the response to prevent grabbing an old response
 */
export function stopResponseServer() {
    responseFromBolt = undefined;
    server.close();
}
