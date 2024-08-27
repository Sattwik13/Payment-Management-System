const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc'; // AES-256 encryption
const KEY = crypto.randomBytes(32); // 32 bytes key for AES-256
const IV = crypto.randomBytes(16);  // 16 bytes IV

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), IV);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return IV.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (encryptedText) => {
  const textParts = encryptedText.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedTextBuffer = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), iv);
  let decrypted = decipher.update(encryptedTextBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

module.exports = { encrypt, decrypt };
