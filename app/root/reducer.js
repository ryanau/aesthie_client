import { fromJS } from 'immutable';
import { CHANGE_SELECTED_CITY } from './constants';

const initialState = fromJS({
  selectedCityId: 1,
});

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_SELECTED_CITY:
      return state.set('selectedCityId', payload);
    default:
      return state;
  }
}

export default rootReducer;

