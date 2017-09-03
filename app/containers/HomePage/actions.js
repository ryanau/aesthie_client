/*
 *
 * HomePage actions
 *
 */

import {
  CHANGE_SELECTED_CITY,
  CLOSE_SELECT_CITY_MODAL,
  OPEN_SELECT_CITY_MODAL,
} from './constants';

export function changeSelectedCity(params) {
  return {
    type: CHANGE_SELECTED_CITY,
    payload: params,
  };
}

export function closeSelectCityModal() {
  return {
    type: CLOSE_SELECT_CITY_MODAL,
  };
}

export function openSelectCityModal() {
  return {
    type: OPEN_SELECT_CITY_MODAL,
  };
}
