import types from './types';
import io from 'socket.io-client';

const socket = io.connect("120.76.133.127:8081");

export const chartDataMiddleware = (store) => (next) => (action) => {
  switch(action.type){
    case types.FETCH_REQUESTS:
      socket.on('chartData', (socketData, ack) => {
        let { data, timeStamp } = socketData;
        ack(timeStamp);
        let newAction = Object.assign({}, action, {payload: data}, {type: types.DATA_RECEIVED});
        store.dispatch(newAction);
        next(action);
      });
      break;
    default:
      next(action);
  }
}
