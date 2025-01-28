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
