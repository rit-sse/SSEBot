import * as chai from 'chai';
import * as chaiString from 'chai-string';

const expect = chai.expect;
chai.use(chaiString);

describe('unit.commands.sample', function () {
    it('does a thing', async function () {
        const res = '';

        expect(res).to.equalIgnoreSpaces('');
    });
});
