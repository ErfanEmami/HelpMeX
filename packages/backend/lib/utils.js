import bcrypt from 'bcryptjs';

export const hashPassword = async (plain_password) => {
  const hashed_password = await bcrypt.hash(plain_password, 10);
  return hashed_password
}

export const validatePassword = async (plain_password, hashed_password) => {
  const is_valid_password = await bcrypt.compare(plain_password, hashed_password)
  return is_valid_password
}