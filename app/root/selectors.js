import { createSelector } from 'reselect';

const selectRootState = (state) => state.get('root');

const getSelectedCityId = createSelector(
  selectRootState,
  (state) => state.get('selectedCityId'),
);

export {
  getSelectedCityId,
};

