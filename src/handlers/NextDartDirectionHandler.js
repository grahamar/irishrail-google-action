import { findNextTrainTo } from '../helpers';
import * as store from '../datastore';

const Parameters = {
  STATION: 'station'
};

export default (app, client) => {
  const stationArg = app.getArgument(Parameters.STATION);
  return client.station({ code: 'DLERY' }).then(station => {
    return findNextTrainTo(station, defaultStation, client).then(nextTrain => {
      console.log('Found next train to', defaultStation, '->', nextTrain);
      return app.tell(`Next train due into ${station.name} at ${nextTrain.expectedArrival}`);
    });
  });
};
