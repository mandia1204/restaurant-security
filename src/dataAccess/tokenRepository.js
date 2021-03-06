import Token from '../models/tokenModel';

const tokenRepository = () => {
  const findToken = (params) => Token.findOne(params).exec();

  const saveToken = (token) => {
    const newToken = new Token(token);
    return newToken.save();
  };

  return {
    findToken,
    saveToken,
  };
};

export default tokenRepository;
