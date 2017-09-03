import { fromJS } from 'immutable';
import normalize from 'utils/normalizeEntities';

import {
} from './constants';

const initialState = fromJS({
  allIds: ['1', '2'],
  byId: {
    1: { id: 1, name: 'San Francisco', tag: 'sanfrancisco' },
    2: { id: 2, name: 'Los Angeles', tag: 'losangeles' },
  },
});

function citiesReducer(state = initialState, { type, payload }) {
  switch (type) {
    default:
      return state;
  }
}

export default citiesReducer;


