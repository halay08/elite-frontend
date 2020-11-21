import about from './about.json';
import button from './button.json';
import options from './options.json';
import prejoin from './prejoin.json';
import metadata from './metadata.json';

export default {
  room: {
    ...about,
    ...button,
    ...options,
    ...prejoin,
    ...metadata,
  },
};
