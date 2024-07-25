export const voteForPresidentSchema = {
  userId: {
    notEmpty: {
      errorMessage: "userId must not be empty",
    },
    isNumeric: {
      errorMessage: "userId must be a number",
    },
  },
  candidateIndex: {
    notEmpty: {
      errorMessage: "candidateIndex must not be empty",
    },
    isNumeric: {
      errorMessage: "candidateIndex must be a number",
    },
  },
};
export const voteForGovernorSchema = {
  county: {
    notEmpty: {
      errorMessage: "county cannot be empty",
    },
    isLength: {
      Option: { min: 3 },
      errorMessage: "county should have minimum of 3 characters",
    },
    isString: {
      errorMessage: "county must be a string",
    },
  },
  userId: {
    notEmpty: {
      errorMessage: "userId must not be empty",
    },
    isNumeric: {
      errorMessage: "userId must be a number",
    },
  },
  candidateIndex: {
    notEmpty: {
      errorMessage: "candidateIndex must not be empty",
    },
    isNumeric: {
      errorMessage: "candidateIndex must be a number",
    },
  },
};
