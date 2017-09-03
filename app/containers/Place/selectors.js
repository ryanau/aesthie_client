import { createSelector } from 'reselect';

/**
 * Direct selector to the place state domain
 */
const selectPlaceDomain = () => (state) => state.get('place');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Place
 */

const makeSelectPlace = () => createSelector(
  selectPlaceDomain(),
  (substate) => substate.toJS()
);

export default makeSelectPlace;
export {
  selectPlaceDomain,
};
