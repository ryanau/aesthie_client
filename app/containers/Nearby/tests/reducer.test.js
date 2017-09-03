
import { fromJS } from 'immutable';
import nearbyReducer from '../reducer';

describe('nearbyReducer', () => {
  it('returns the initial state', () => {
    expect(nearbyReducer(undefined, {})).toEqual(fromJS({}));
  });
});
