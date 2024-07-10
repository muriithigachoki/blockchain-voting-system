export const presidentialCandidate = {
  name: {
    notEmpty: {
      errorMessage: "name must not be empty",
    },
    isLength: {
      options: { min: 5 },
      errorMessage: "name must be atleast 3 characters",
    },
    isString: {
      errorMessage: "name must be a string",
    },
  },
};
