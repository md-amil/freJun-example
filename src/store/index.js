import {configureStore} from '@reduxjs/toolkit';
import {applyMiddleware} from 'redux';

import beerReducer from './beers';
import thunk from 'redux-thunk';

const store = configureStore(
  {
    reducer: {
      beers: beerReducer,
    },
  },
  applyMiddleware(thunk),
);

export default store;
