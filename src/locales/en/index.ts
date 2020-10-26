import texts from './translation.json';
import errorMessages from './errors.json';
import recommendedBar from './recommendedbar.json';
import banner from './banner.json';

const en = Object.assign(texts, errorMessages, recommendedBar, banner);

export default en;
