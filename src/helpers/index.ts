import { User } from 'types/User';
import { HOC, branch, renderNothing } from 'recompose';

function getUserName(user: User) {
  const fullName = `${user.name || ''} ${user.surname || ''}`.trim();
  const name = fullName || user.email || user.phoneNumber || '';
  return name;
}

const hideIfNoData = (hasNoData: HOC) => branch(hasNoData, renderNothing);

export { getUserName, hideIfNoData };
