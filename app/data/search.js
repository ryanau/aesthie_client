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

const searchPlace = (id) => {
  const keys = Object.keys(data["places"]);
  const result = keys.map((key) => {
    return data["places"][key].map((place) => {
      return place["id"] === id ? place : null;
    }).filter(Boolean)[0];
  }).filter(Boolean)[0];
  return result ? result : null;
}

export { searchPlaces, searchPlace };
