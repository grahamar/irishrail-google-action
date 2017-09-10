import { findNextTrainTo } from '../helpers';
import * as store from '../datastore';

const Parameters = {
  STATION: 'station'
};

export default (app, client) => {
  const userId = app.getUser().userId;
  return store.read(userId).then((profile) => {
    if(profile) {
      const { defaultStation } = profile;
      return client.station({ code: 'DLERY' }).then(station => {
        return findNextTrainTo(station, defaultStation, client).then(nextTrain => {
          console.log('Found next train to', defaultStation, '->', nextTrain);
          return app.tell(`Next train due into ${station.name} at ${nextTrain.expectedArrival}`);
        });
      }).catch((err) => {
        console.error(err);
        throw err;
      });
    } else {
      return app.tell("I couldn't find your default destination. Please set one.");
    }
  }).catch((err) => {
    console.error(err);
    throw err;
  });
};
