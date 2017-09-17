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
      image: 'https://lonelyplanetimages.imgix.net/a/g/hi/t/9cf024dfd5c0bcb2b17f4785340145ea-san-francisco.jpg?sharp=10&vib=20&w=280',
    },
    2: {
      id: 2,
      name: 'Los Angeles',
      tag: 'losangeles',
      coordinates: {
        lat: 34.0522,
        lng: -118.2437,
      },
      image: 'https://lonelyplanetimages.imgix.net/a/g/hi/t/f4003584e847990e3cae4b5d8062e342-los-angeles.jpg?sharp=10&vib=20&w=280',
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

