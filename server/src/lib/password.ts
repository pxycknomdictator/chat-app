import * as argon2 from "argon2";

export const hashPassword = async (password: string) => {
  try {
    return await argon2.hash(password, { hashLength: 20 });
  } catch (error) {
    throw new Error(`Failed to hash password ${error}`);
  }
};

export const decodePassword = async (password: string, hash: string) => {
  try {
    return await argon2.verify(hash, password);
  } catch (error) {
    throw new Error(`Failed to hash password ${error}`);
  }
};
