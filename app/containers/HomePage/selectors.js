import { createSelector } from 'reselect';

const selectHomePageState = (state) => state.get('homePage');

const getSelectedCityId = createSelector(
  selectHomePageState,
  (state) => state.get('selectedCityId'),
);

const getIsSelectCityModalOpen = createSelector(
  selectHomePageState,
  (state) => state.get('isSelectCityModalOpen'),
);

export {
  getSelectedCityId,
  getIsSelectCityModalOpen,
};

