import { flatten, uniq } from 'lodash';
import places from './places.json';

const generateTags = (cityId) => uniq(flatten(places.places[cityId].map((place) => place.hash_tags)));

export default generateTags;
