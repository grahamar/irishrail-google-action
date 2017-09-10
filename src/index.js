import { IrishRailClient } from 'irishrail-client';
import { ApiAiApp } from 'actions-on-google';
import handlers from './handlers';

const client = new IrishRailClient();

const Actions = {
  SAVE_DEFAULT_DESTATION: 'save.default.station.to',
  TELL_NEXT_DART_DIRECTION: 'tell.next.dart.direction',
  TELL_NEXT_DART_DEFAULT: 'tell.next.dart.default',
  TELL_NEXT_DART_TO: 'tell.next.dart.to'
};

function requestHandler (app) {
  const intent = app.getIntent();
  switch (intent) {
    case Actions.SAVE_DEFAULT_DESTATION:
      return handlers.SaveDefaultDestination(app, client);
    case Actions.TELL_NEXT_DART_DIRECTION:
      return handlers.NextDartDirection(app, client);
    case Actions.TELL_NEXT_DART_TO:
      return handlers.NextDartTo(app, client);
    case Actions.TELL_NEXT_DART_DEFAULT:
      return handlers.NextDart(app, client);
    default:
      console.error('Unknown Intent: ', intent);
  }
};

export const handler = (request, response) => {
  const app = new ApiAiApp({ request, response });
  console.log(`Request headers: ${JSON.stringify(request.headers)}`);
  console.log(`Request body: ${JSON.stringify(request.body)}`);
  app.handleRequest(requestHandler);
};
