
import { fromJS } from 'immutable';
import influencerReducer from '../reducer';

describe('influencerReducer', () => {
  it('returns the initial state', () => {
    expect(influencerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
