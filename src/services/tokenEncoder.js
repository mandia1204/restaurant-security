import jwt from 'jwt-simple';
import moment from 'moment';
import config from 'config';

const authConfig = config.get('auth');

const tokenEncoder = () => {
  const getTokenPayload = (userName, type) => {
    const { exp } = authConfig[type];
    return {
      userName,
      iss: authConfig.issuer,
      aud: authConfig.audience,
      exp: moment().add(exp.amount, exp.unit).unix(),
    };
  };

  const encode = (userName, type) => jwt.encode(getTokenPayload(userName, type), authConfig[type].jwtSecret);

  return {
    encode,
  };
};

export default tokenEncoder;
