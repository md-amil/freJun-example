//action type
const SET_BEERS = 'SET_BEERS';
const ADD_BEERS = 'ADD_BEERS';
const RESET_BEERS = 'RESET_BEERS';

//action creator
export const setBeers = beers => ({
  type: SET_BEERS,
  payload: beers,
});

export const addBeers = beers => ({
  type: ADD_BEERS,
  payload: beers,
});
export const resetBeers = () => ({
  type: RESET_BEERS,
  payload: [],
});

export default function beerReducer(state = [], action) {
  if (action.type === SET_BEERS) {
    return action.payload;
  }
  if (action.type === RESET_BEERS) {
    return action.payload;
  }
  if (action.type === ADD_BEERS) {
    return [...state, ...action.payload];
  }
  return state;
}
