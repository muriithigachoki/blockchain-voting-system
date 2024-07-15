export const presidetialSchema = {
  username: {
    notEmpty: {
      errorMessage: "username must not be empty",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "username must be atleast 3 characters",
    },
    isString: {
      errorMessage: "username must be a string",
    },
  },
};

export const governorSchema = {
  county: {
    notEmpty: {
      errorMessage: "username must not be empty",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "username must be atleast 3 characters",
    },
    isString: {
      errorMessage: "username must be a string",
    },
  },
  username: {
    notEmpty: {
      errorMessage: "username must not be empty",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "username must be atleast 3 characters",
    },
    isString: {
      errorMessage: "username must be a string",
    },
  },
};

export const getGovernorSchema = {
  value: {
    notEmpty: {
      errorMessage: "username must not be empty",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "username must be atleast 3 characters",
    },
    isString: {
      errorMessage: "username must be a string",
    },
  },
};

export const addMPSchema = {
  county: {
    notEmpty: {
      errorMessage: "county must not be empty",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "county must be atleast 3 characters",
    },
    isString: {
      errorMessage: "county must be a string",
    },
  },
  constituency: {
    notEmpty: {
      errorMessage: "constituency must not be empty",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "constituency must be atleast 3 characters",
    },
    isString: {
      errorMessage: "constituency must be a string",
    },
  },
  username: {
    notEmpty: {
      errorMessage: "username must not be empty",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "username must be atleast 3 characters",
    },
    isString: {
      errorMessage: "username must be a string",
    },
  },
};
export const getMPSchema = {
  county: {
    notEmpty: {
      errorMessage: "county must not be empty",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "county must be atleast 3 characters",
    },
    isString: {
      errorMessage: "county must be a string",
    },
  },
  constituency: {
    notEmpty: {
      errorMessage: "constituency must not be empty",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "constituency must be atleast 3 characters",
    },
    isString: {
      errorMessage: "constituency must be a string",
    },
  },
};
