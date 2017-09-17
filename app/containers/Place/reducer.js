/*
 *
 * Place reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_PLACE,
} from './constants';

const initialState = fromJS({
  place: null,
  isLoaded: false,
});

function placeReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PLACE:
      return state.withMutations((s) =>
        s.set('place', action.payload)
         .set('isLoaded', true)
      );
    default:
      return state;
  }
}

export default placeReducer;
