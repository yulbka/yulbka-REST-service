const bcrypt = require('bcrypt');

const saltRounds = 10;

const crypt = async (text) => await bcrypt.hash(text, saltRounds);
const checkCrypt = async (text, hash) => await bcrypt.compare(text, hash);

module.exports = { crypt, checkCrypt };