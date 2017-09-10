import * as store from '../datastore';

const Parameters = {
  STATION: 'station'
};

export default (app) => {
  const station = app.getArgument(Parameters.STATION);
  const userId = app.getUser().userId;

  console.log('SaveDefaultDestinationHandler', station, userId);

  return store.save(userId, { defaultStation: station }).then((data) => {
    console.log('Saved!', data);
    return app.tell(`Saved ${station} as your default station.`);
  }).catch(err => {
    console.error(err);
    return app.tell("I'm sorry, I couldn't save your default station.");
  });
};
