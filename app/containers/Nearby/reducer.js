/*
 *
 * Nearby reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CLOSE_SELECT_CITY_MODAL,
  OPEN_SELECT_CITY_MODAL,
} from './constants';

const initialState = fromJS({
  isSelectCityModalOpen: false,
});

function nearbyReducer(state = initialState, action) {
  switch (action.type) {
    case CLOSE_SELECT_CITY_MODAL:
      return state.set('isSelectCityModalOpen', false);
    case OPEN_SELECT_CITY_MODAL:
      return state.set('isSelectCityModalOpen', true);
    default:
      return state;
  }
}

export default nearbyReducer;
