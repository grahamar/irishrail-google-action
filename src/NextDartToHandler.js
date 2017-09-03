import { IrishRailClient, StationType } from 'irishrail-client';

const Parameters = {
  STATION: 'station'
};

const client = new IrishRailClient();

const NextDartToHandler = (app) => {
  const stationArg = app.getArgument(Parameters.STATION);
  console.log('NextDartToHandler', stationArg);
  return client.station({ code: 'DLERY' }).then(station => {
    const nextTrain = station.trainsDue[0];
    console.log('nextTrain', nextTrain);
    return app.tell(`Next train due into ${station.name} at ${nextTrain.expectedArrival}`);
  });
};

export default NextDartToHandler;
