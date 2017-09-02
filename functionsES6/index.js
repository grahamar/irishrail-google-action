import { ApiAiApp } from 'actions-on-google';
import * as functions from 'firebase-functions';
import NextDartToHandler from './NextDartToHandler';

const Actions = {
  TELL_NEXT_DART_TO: 'tell.next.dart.to'
};

const Parameters = {
  STATION: 'station'
};

const ActionMap = new Map();
ActionMap.set(Actions.TELL_NEXT_DART_TO, NextDartToHandler);

export const nextDart = functions.https.onRequest((req, res) => {
  const app = new ApiAiApp({ request, response });
  console.log(`Request headers: ${JSON.stringify(request.headers)}`);
  console.log(`Request body: ${JSON.stringify(request.body)}`);
  app.handleRequest(ActionMap);
})
