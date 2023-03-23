import {configureStore} from '@reduxjs/toolkit';
import beerReducer from './beers';

const store = configureStore({
  reducer: {
    beers: beerReducer,
  },
});

export default store;
