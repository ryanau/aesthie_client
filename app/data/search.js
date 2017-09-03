import data from './places.json';

const checkParam = (params, tags) => {
  return params.every((param) => !!tags.match('#' + param + ' '));
}

const searchPlaces = (selectedCityId, params) => {
  if (params === '') return data["places"][selectedCityId];
  return data["places"][selectedCityId].filter((place) => {
    return checkParam(params, place["hash_tags"].map(v => `#${v} `).join());
  });
}

export default searchPlaces;
