export type User = {
  email: string;

  name: string;

  phoneNumber?: string;

  surname?: string;

  avatar?: string;
};

export type SignUpUser = {
  role: string;
  email: string;
  uid: string;
  createdAt: string;
};
