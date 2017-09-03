import {
  UPDATE_PLACES,
} from './constants';
import { searchPlaces } from 'data/search';

export function fetchPlaces(selectedCityId, params) {
  const places = searchPlaces(selectedCityId, params);
  return {
    type: UPDATE_PLACES,
    payload: { places },
  };
}

