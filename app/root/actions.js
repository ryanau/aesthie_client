import {
  CHANGE_SELECTED_CITY,
} from './constants';

export function changeSelectedCity(params) {
  return {
    type: CHANGE_SELECTED_CITY,
    payload: params,
  };
}
