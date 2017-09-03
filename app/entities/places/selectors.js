import { createSelector } from 'reselect';

const selectPlacesState = (state) => state.getIn(['entities', 'places']);

const getPlaces = createSelector(
  selectPlacesState,
  (places) => places.get('allIds').map((id) => places.getIn(['byId', id]))
);

const getPlaceById = createSelector(
  selectPlacesState,
  (places) => places.get('byId'),
);

export {
  getPlaces,
  getPlaceById,
};


