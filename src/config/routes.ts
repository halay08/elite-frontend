type IRoute = {
  home: string;
  login: string;
  dashboard: string;
  accountSettings: string;
  accountTutors: string;
  emailVerification: string;
  forgotPassword: string;
  accountAction: string;
};

class RoutePath implements IRoute {
  home = '/';
  login = '/login';
  dashboard = '/dashboard';
  accountSettings = '/account/settings';
  accountTutors = '/account/tutors';
  emailVerification = '/email-verification';
  forgotPassword = '/forgot-password';
  accountAction = '/account-action';
  tutorProfile = '/tutor';
}

export default new RoutePath();
