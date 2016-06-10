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

    client.get(actionData.url, {params: actionData.params})
      .then(response => {
        let responseData = response.data;

        let newAction = {
          type: actionData.type + '_SUCCESS',
          payload: normalize(responseData.data, actionData.schema),
          meta: responseData.meta
        }

        return store.dispatch(newAction);
      })
      .catch(err => {
        let newAction = {
          type: actionData.type + '_FAIL',
          error: true,
          payload: {
            message: 'Error al conectar con el servidor'
          }
        };

        return store.dispatch(newAction);
      })
  } else {
    next(action);
  }

}

export default middleware;