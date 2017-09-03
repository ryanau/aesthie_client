import { createSelector } from 'reselect';

const selectPlaceState = (state) => state.get('place');

const getPlace = createSelector(
  selectPlaceState,
  (state) => state.get('place'),
);

const getIsLoaded = createSelector(
  selectPlaceState,
  (state) => state.get('isLoaded'),
);

export {
  getPlace,
  getIsLoaded,
};

