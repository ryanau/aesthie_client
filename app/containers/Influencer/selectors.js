import { createSelector } from 'reselect';

/**
 * Direct selector to the influencer state domain
 */
const selectInfluencerDomain = () => (state) => state.get('influencer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Influencer
 */

const makeSelectInfluencer = () => createSelector(
  selectInfluencerDomain(),
  (substate) => substate.toJS()
);

export default makeSelectInfluencer;
export {
  selectInfluencerDomain,
};
