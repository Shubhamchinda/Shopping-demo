const bcrypt = require("bcrypt-nodejs");
const encryptOperations = {
  salt: 10,
  encryptPassword(password) {
    return bcrypt.hashSync(password);
  },
  compaerPassword(password, hashPassowrd) {
    return bcrypt.compareSync(password, hashPassowrd);
  }
};
export default encryptOperations;
