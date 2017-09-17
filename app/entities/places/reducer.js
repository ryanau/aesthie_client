import { fromJS } from 'immutable';
import normalize from 'utils/normalizeEntities';

import { UPDATE_PLACES } from './constants';

const initialState = fromJS({
  allIds: [],
  byId: {},
});

function placesReducer(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_PLACES: {
      return state.merge(normalize(payload.places));
    }
    default:
      return state;
  }
}

export default placesReducer;

