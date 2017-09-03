import { createSelector } from 'reselect';

/**
 * Direct selector to the nearby state domain
 */
const selectNearbyDomain = () => (state) => state.get('nearby');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Nearby
 */

const makeSelectNearby = () => createSelector(
  selectNearbyDomain(),
  (substate) => substate.toJS()
);

export default makeSelectNearby;
export {
  selectNearbyDomain,
};
