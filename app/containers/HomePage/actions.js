/*
 *
 * HomePage actions
 *
 */

import {
  CLOSE_SELECT_CITY_MODAL,
  OPEN_SELECT_CITY_MODAL,
} from './constants';

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
