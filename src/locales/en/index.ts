import texts from './translation.json';
import errorMessages from './errors.json';
import recommendedBar from './recommendedbar.json';
import banner from './banner.json';
import timeline from './timeline.json';
import tutorThumbnail from './tutorBlock.json';

const en = {
  ...texts,
  ...errorMessages,
  ...recommendedBar,
  ...banner,
  ...timeline,
  ...tutorThumbnail,
};

export default en;
