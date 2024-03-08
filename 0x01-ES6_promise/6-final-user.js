import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default async function handleProfileSignup(firstName, lastName, fileName) {
  return Promise
    .allSettled([signUpUser(firstName, lastName), uploadPhoto(fileName)])
    .then((value) => (
      value.map((i) => ({
        status: i.status,
        value: i.status === 'fulfilled' ? i.value : String(i.reason),
      }))
    ));
}
