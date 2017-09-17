import { fromJS } from 'immutable';
// import normalize from 'utils/normalizeEntities';

import {
} from './constants';

const initialState = fromJS({
  allIds: ['1', '2'],
  byId: {
    1: {
      id: 1,
      name: 'San Francisco',
      tag: 'sanfrancisco',
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
    2: {
      id: 2,
      name: 'Los Angeles',
      tag: 'losangeles',
      coordinates: {
        lat: 34.0522,
        lng: -118.2437,
      },
    },
  },
});

function citiesReducer(state = initialState, { type, payload }) {
  switch (type) {
    default:
      return state;
  }
}

export default citiesReducer;

