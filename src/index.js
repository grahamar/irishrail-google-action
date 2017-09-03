import { ApiAiApp } from 'actions-on-google';
import NextDartToHandler from './NextDartToHandler';

const Actions = {
  TELL_NEXT_DART_TO: 'tell.next.dart.to'
};

function requestHandler (app) {
  const intent = app.getIntent();
  switch (intent) {
    case Actions.TELL_NEXT_DART_TO:
      return NextDartToHandler(app);
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
