/*
 *
 * Place actions
 *
 */

import {
  UPDATE_PLACE,
} from './constants';
import { searchPlace } from 'data/search';

export function fetchPlace(id) {
  const result = searchPlace(id)
  return {
    type: UPDATE_PLACE,
    payload: result,
  };
}
