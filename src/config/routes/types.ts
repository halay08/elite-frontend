export declare namespace routeConfig {
  type IUniversal = {
    home: string;

    login: string;

    logout: string;

    forgotPassword: string;

    accountAction: string;

    dashboard: string;

    tutor: IPublicTutor;

    calendar: string;

    help: IHelp;
  };

  type IHelp = {
    // List all questions
    list: string;

    // Help detail page
    get: string;
  };

  type IStudentAccount = {
    main: string;

    setting: string;

    profile: string;

    session: string;

    help: string;
  };

  type ITutor = {
    // List all students
    students: string;

    // Tutor review student
    review: IReview;

    report: string;
  };

  type IReview = {
    // Paginate reviewers
    list: string;

    // Student review tutor
    post: string;
  };

  type IBooking = {
    request: string; // Send request booking

    // Get booking confirm page
    // @see https://www.figma.com/file/NivhSzww2nVOr1r15cx7ao/Create-Course%2FSession-Form?node-id=100%3A1
    confirmation: string;

    // Return URL for payment gateway (thank you page)
    returnUrl: string;

    // Instant Payment Notification
    ipnUrl: string;

    // Get booking history
    history: string;
  };

  type IPublicTutor = {
    // Tutor grid
    list: string;

    // Profile: Experiences, introduction,...
    profile: string;

    // Follow tutor
    follow: string;

    // Load calendar
    calendar: string;

    review: IReview;

    // Student report tutor
    report: string;

    // Load session
    session: string;
  };

  type IStudent = {
    account: IStudentAccount;

    booking: IBooking;
  };
}
