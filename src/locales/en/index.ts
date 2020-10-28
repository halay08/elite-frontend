import texts from './translation.json';
import errorMessages from './errors.json';
import recommendedBar from './tutorBlock/recommendedbar.json';
import tutorBlock from './tutorBlock/tutorBlock.json';
import advancedSearch from './tutorBlock/advancedSearch.json';
import timeline from './timeline.json';
import global from './global.json';

const en = {
  ...texts,
  ...errorMessages,
  ...recommendedBar,
  ...timeline,
  ...tutorBlock,
  ...advancedSearch,
  ...global,
};

export default en;
