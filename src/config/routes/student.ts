import { routeConfig } from './types';

class StudentRouteConfig implements routeConfig.IStudent {
  account = {
    main: '/me',
    setting: '/me/settings',
    profile: '/me/profile',
    session: '/me/session',
    help: '/me/help',
  };
  booking = {
    request: '/booking/request',
    confirmation: '/booking/confirm',
    returnUrl: '/booking/thank-you',
    ipnUrl: '/booking/ipn',
    history: '/booking/history',
  };
}

export default new StudentRouteConfig();
