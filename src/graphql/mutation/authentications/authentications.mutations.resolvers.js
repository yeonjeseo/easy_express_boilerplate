import { publishToken } from '../../../services/authenticate.service.js';
export const loginGraphql = async (args, authenticate) => {
  try {
    const { account, password } = args;

    const { user, info } = await authenticate('graphql-local', {
      account,
      password,
    });

    if (user === false || user === true) return info.message;
    const tokens = await publishToken(user);

    return JSON.stringify(tokens);
  } catch (e) {
    console.log(e);
    return e.message;
  }
};
