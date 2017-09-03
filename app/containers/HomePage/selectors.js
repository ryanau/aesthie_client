import { createSelector } from 'reselect';

const selectHomePageState = (state) => state.get('homePage');

const getIsSelectCityModalOpen = createSelector(
  selectHomePageState,
  (state) => state.get('isSelectCityModalOpen'),
);

export {
  getIsSelectCityModalOpen,
};

