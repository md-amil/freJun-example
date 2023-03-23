import axios from '../api';

//action type
const SET_BEERS = 'SET_BEERS';
const ADD_BEERS = 'ADD_BEERS';
const RESET_BEERS = 'RESET_BEERS';
const LOADING_STATUS = 'LOADING_STATUS';

export const fetchBeers = page => async dispatch => {
  const {data} = await axios
    .get('beers', {
      params: {page},
    })
    .catch(err => {
      console.log(err);
    });
  if (page === 1) {
    dispatch(setBeers(data));
  } else {
    dispatch(addBeers(data));
  }
  dispatch(loadingStatus(false));
};

//action creator
export const loadingStatus = status => ({
  type: LOADING_STATUS,
  payload: status,
});

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

export default function beerReducer(
  state = {loading: false, data: []},
  action,
) {
  if (action.type === SET_BEERS) {
    return {...state, data: action.payload};
  }
  if (action.type === RESET_BEERS) {
    return {...state, data: action.payload};
  }
  if (action.type === ADD_BEERS) {
    return {...state, data: [...state.data, ...action.payload]};
  }
  if (action.type === LOADING_STATUS) {
    return {...state, loading: action.payload};
  }
  return state;
}
