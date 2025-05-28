import { v4 as uuidv4 } from "uuid";

const verificationTokens = {};

const createVerificationToken = (userData) => {
  const token = uuidv4();
  verificationTokens[token] = {
    userData,
    expires: Date.now() + 24 * 60 * 60 * 1000 // Token có hiệu lực trong 24 giờ
  };
  return token;
};

// Kiểm tra token xác minh
const verifyEmailToken = (token) => {
  const tokenInfo = verificationTokens[token];
  if (!tokenInfo) {
    return { valid: false, reason: "Token không tồn tại" };
  }
  
  if (Date.now() > tokenInfo.expires) {
    delete verificationTokens[token];
    return { valid: false, reason: "Token đã hết hạn" };
  }
  
  return { valid: true, userData: tokenInfo.userData };
};

export {
  createVerificationToken,
  verifyEmailToken
};