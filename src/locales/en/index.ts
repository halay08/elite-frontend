import texts from './translation.json';
import errorMessages from './errors.json';
import tutorBlock from './tutorBlock';
import timeline from './timeline.json';
import global from './global.json';
import layout from './layout.json';
import tutorProfile from './tutorProfile';
import room from './room';

const en = {
  ...texts,
  ...errorMessages,
  ...timeline,
  ...tutorBlock,
  ...global,
  ...layout,
  ...tutorProfile,
  ...room,
};

export default en;
