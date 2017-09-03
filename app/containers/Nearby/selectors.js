import { createSelector } from 'reselect';

const selectNearbyState = (state) => state.get('nearby');

const getIsSelectCityModalOpen = createSelector(
  selectNearbyState,
  (state) => state.get('isSelectCityModalOpen'),
);

export {
  getIsSelectCityModalOpen,
};

