/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_SELECTED_CITY,
  CLOSE_SELECT_CITY_MODAL,
  OPEN_SELECT_CITY_MODAL,
} from './constants';

const initialState = fromJS({
  selectedCityId: 1,
  isSelectCityModalOpen: false,
});

function homePageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_SELECTED_CITY:
      return state.set('selectedCityId', payload);
    case CLOSE_SELECT_CITY_MODAL:
      return state.set('isSelectCityModalOpen', false);
    case OPEN_SELECT_CITY_MODAL:
      return state.set('isSelectCityModalOpen', true);
    default:
      return state;
  }
}

export default homePageReducer;

