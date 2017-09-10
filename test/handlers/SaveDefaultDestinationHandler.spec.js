/* global describe, it, before */

import Handler from '../../src/handlers/SaveDefaultDestinationHandler';
import sinon from 'sinon';


let app, tell;

describe('With the intent to save a default destination station', () => {
  before(() => {
    tell = sinon.stub();
    app = {
      tell,
      getArgument: sinon.stub().returns('Grand Canal Dock'),
      getUser: sinon.stub().returns({ userId: 'mytestuserid' })
    };
  });

  describe('when I get an intent to save a default destination', () => {
    it('should save the station as the users default', (done) => {
      Handler(app).then(() => {
        sinon.assert.calledWith(app.tell, 'Saved Grand Canal Dock as your default station.');
        done();
      }).catch((err) => {
        sinon.assert.fail(err);
        done();
      });
    });
  });

});
