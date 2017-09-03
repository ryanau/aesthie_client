import { createSelector } from 'reselect';

const selectCitiesState = (state) => state.getIn(['entities', 'cities']);

const getCities = createSelector(
  selectCitiesState,
  (cities) => cities.get('allIds').map((id) => cities.getIn(['byId', id]))
);

const getCitiesById = createSelector(
  selectCitiesState,
  (cities) => cities.get('byId'),
);

export {
  getCities,
  getCitiesById,
};


