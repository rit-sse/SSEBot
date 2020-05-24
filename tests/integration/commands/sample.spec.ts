import { expect } from 'chai';
import * as assert from "assert";
import { responseFromBolt, server, startResponseServer, stopResponseServer } from "../../util/testServer";
import { mockRequest, sendMockSlackMessage } from "../../util/mockMessage";

require('../../../src/index'); // start server

xdescribe('integration.commands.sample', function () {

    beforeEach(async () => {
        startResponseServer();
    });
    afterEach(() => stopResponseServer());

    it('does a thing', async function () {
        const port = server.address().port;
        const data = mockRequest(port, 'message', false);
        await sendMockSlackMessage(data);

        // wait 1s for the response to slack to go through, then check it
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!responseFromBolt) {
            assert.fail("Request was not processed in time");
        }

        expect(responseFromBolt.body.replace_original).to.be.true;
    });
});
