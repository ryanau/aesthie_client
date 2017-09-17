import { searchPlaces } from 'data/search';
import {
  UPDATE_PLACES,
} from './constants';

export function fetchPlaces(selectedCityId, params) {
  const places = searchPlaces(selectedCityId, params);
  return {
    type: UPDATE_PLACES,
    payload: { places },
  };
}

