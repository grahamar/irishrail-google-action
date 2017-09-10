import { tail, map, filter, groupBy, sortBy, head, find, isEmpty } from 'lodash';
import Promise from 'bluebird';

const doTrainsGoHere = (trains, destinationName, client) => {
  const train = head(trains);
  return client.trainMovements(train).then(movements => {
    const found = find(movements, m => m.locationName == destinationName);
    if (found) {
      return train;
    } else if (!isEmpty(trains)) {
      return doTrainsGoHere(tail(trains), destinationName, client);
    } else {
      return {};
    }
  });
};

export const findNextTrainTo = (station, destinationName, client) => {
  // Remove all trains that terminate here
  const trainsDue = filter(station.trainsDue, t => {
    return t.locationType != 'D' && t.locationType != 'T'
  });

  // Find the next train for each type and direction
  const trainsByDirection = groupBy(trainsDue, t => `${t.direction}_${t.type}`);
  const nextTrains = map(trainsByDirection, (trains) => (
    head(sortBy(trains, t => t.dueInMins))
  ));

  // For each direction & type find which one stops at the requested station
  return doTrainsGoHere(nextTrains, destinationName, client);
};
