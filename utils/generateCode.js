// Generating codes.
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const generateCode = async (length) => {
  try {
    const uniqueString = uuidv4();
    const hashedString = await bcrypt.hash(uniqueString, 10);
    const code = hashedString.trim().toUpperCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ois]/gi, '');
    return code.slice(length * -1);
  } catch (error) {
    return error;
  }
}

module.exports = generateCode;