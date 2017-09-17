/*
 *
 * Place actions
 *
 */

import { searchPlace } from 'data/search';
import {
  UPDATE_PLACE,
} from './constants';

export function fetchPlace(id) {
  const result = searchPlace(id);
  return {
    type: UPDATE_PLACE,
    payload: result,
  };
}
