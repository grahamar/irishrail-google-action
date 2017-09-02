import { IrishRailClient, StationType } from 'irishrail-client';

const client = new IrishRailClient();

const NextDartToHandler = ({ data }) => {
  client.station({ code: 'DLERY' }).then(station => {
    const nextTrain = station.trainsDue[0];
    return app.tell(`Next train due into ${station.name} at ${nextTrain.expectedArrival}`);
  });
};

export default NextDartToHandler;
