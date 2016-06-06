import _ from 'lodash';
import axios from 'axios';
import {normalize} from 'normalizr';

export const CALL_API = 'CALL_API'

let client = axios.create({
  baseURL: 'http://192.168.0.2:1337',
  responseType: 'json'
});

let middleware = store => next => action => {
  if (_.has(action, CALL_API)) {
    let actionData = action[CALL_API];

    store.dispatch({
      type: actionData.type + '_REQUEST'
    });

    client.get(actionData.url)
      .then(response => {
        let responseData = response.data.data;

        responseData = normalize(responseData, actionData.schema);

        store.dispatch({
          type: actionData.type + '_SUCCESS',
          payload: responseData
        });
      })
  } else {
    next(action);
  }

}

export default middleware;