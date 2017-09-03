
import { fromJS } from 'immutable';
import placeReducer from '../reducer';

describe('placeReducer', () => {
  it('returns the initial state', () => {
    expect(placeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
