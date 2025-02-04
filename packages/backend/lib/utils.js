import { TwitterApi } from "twitter-api-v2";
import crypto from "crypto";

export const validateResponse = (zodSchema, response) => {
  const validationResult = zodSchema.safeParse(response);

  if (!validationResult.success) {
    throw new Error(
      `Invalid response format: ${JSON.stringify(
        validationResult.error.errors
      )}`
    );
  }

  return validationResult.data;
};

// for background jobs (post scheduler) that need valid accessToken
export const getAccessToken = async (user) => {
  // update accessToken if it's expired
  if (Date.now() > user.expiresAt) {
    console.log("Access token expired, refreshing...");

    const client = new TwitterApi({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    });

    const {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn,
    } = await client.refreshOAuth2Token(user.getDecryptedRefreshToken());

    user.accessToken = newAccessToken;
    user.refreshToken = newRefreshToken;
    user.expiresAt = Date.now() + expiresIn * 1000;
    await user.save();

    return newAccessToken;
  }

  return user.accessToken;
}

const getEncryptionKeyBuffer = () => {
  const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
  if (ENCRYPTION_KEY.length !== 32) {
    throw new Error("ENCRYPTION_KEY must be exactly 32 bytes (64 hex characters).");
  }
  return ENCRYPTION_KEY
}

export const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", getEncryptionKeyBuffer(), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export const decrypt = (text) => {
  const parts = text.split(":");
  const iv = Buffer.from(parts.shift(), "hex");
  const encryptedText = Buffer.from(parts.join(":"), "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", getEncryptionKeyBuffer(), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const safeTweet = async (client, text, options = {}) => {
  try {
    return await client.v2.tweet(text, options);
  } catch (error) {
    if (error.response?.status === 429) {
      console.log("Rate limit exceeded. Retrying in 15 minutes...");
      await sleep(15 * 60 * 1000); // Wait 15 minutes before retrying
      return await client.v2.tweet(text, options);
    }
    throw error;
  }
}