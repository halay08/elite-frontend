import tutorProfile from './tutorProfile.json';
import course from './course.json';
import sidebar from './sidebar.json';
import review from './review.json';
import policies from './policies.json';

export default {
  ...tutorProfile,
  ...course,
  ...sidebar,
  ...review,
  ...policies,
};
