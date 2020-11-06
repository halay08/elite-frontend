import { routeConfig } from './types';

class UniversalRouteConfig implements routeConfig.IUniversal {
  forgotPassword = '/forgot-password';
  accountAction = '/account/action';
  home = '/';
  login = '/login';
  logout = '/logout';
  dashboard = '/dashboard';
  tutor = {
    list: '/tutors',
    profile: '/tutors/:slug',
    follow: '/tutors/follow',
    calendar: '/tutors/calendar',
    review: {
      list: '/tutors/review',
      post: '/tutors/review',
    },
    report: '/tutors/report',
    session: '/tutors/session',
  };
  calendar = '/calendar';
  help = {
    list: '/help',
    get: '/help/:slug',
  };
}

export default new UniversalRouteConfig();
