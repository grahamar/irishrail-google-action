/* global describe, it, before */

import Handler from '../../src/handlers/NextDartHandler';
import { IrishRailClient } from 'irishrail-client';
import sinon from 'sinon';
import path from 'path';
import fs from 'fs';


let client, stub, app, tell;

describe('With the intent to get next dart to default destination', () => {

  before(() => {
    tell = sinon.stub();
    const getUser = sinon.stub().returns({ userId: 'mytestuserid' });
    app = { tell, getUser };

    client = new IrishRailClient();

    const stationDleryJson = fs.readFileSync(path.join(__dirname, 'station_dlery.json'));
    const movementsJson = fs.readFileSync(path.join(__dirname, 'movements.json'));

    stub = sinon.stub(client, 'station').returns(Promise.resolve(JSON.parse(stationDleryJson)));
    stub = sinon.stub(client, 'trainMovements').returns(Promise.resolve(JSON.parse(movementsJson)));
  });

  after(() => {
    stub.restore();
  });

  describe('when I get an intent to tell next dart to default station', () => {
    it('should get users default and tell next dart', (done) => {
      Handler(app, client).then(() => {
        sinon.assert.calledWith(app.tell, 'Next train due into Dun Laoghaire at 18:38');
        done();
      }).catch((err) => {
        sinon.assert.fail(err);
        done();
      });
    });
  });

});
