import { User } from 'types/User';

function getUserName(user: User) {
  const fullName = `${user.name || ''} ${user.surname || ''}`.trim();
  const name = fullName || user.email || user.phoneNumber || '';
  return name;
}

export { getUserName };
