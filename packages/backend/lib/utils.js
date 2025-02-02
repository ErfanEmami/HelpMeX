import { TwitterApi } from "twitter-api-v2";

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

export const refreshTwitterToken = async (user) => {
  try {
    const client = new TwitterApi({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    });

    const {
      client: refreshedClient,
      accessToken,
      refreshToken,
      expiresIn,
    } = await client.refreshOAuth2Token(user.refreshToken);

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.expiresAt = Date.now() + expiresIn * 1000;
    await user.save();

    return accessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw new Error(
      "Twitter authentication failed. User may need to reauthorize."
    );
  }
};
