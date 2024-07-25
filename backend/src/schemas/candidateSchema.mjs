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
  image: {
    notEmpty: {
      errorMessage: "username must not be empty",
    },
    isLength: {
      options: { min: 15 },
      errorMessage: "username must be atleast 15 characters",
    },
    isString: {
      errorMessage: "username must be a string",
    },
  },
};

export const governorSchema = {
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
  image: {
    notEmpty: {
      errorMessage: "email must not be empty",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "email must be atleast 3 characters",
    },
    isString: {
      errorMessage: "email must be a string",
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
      errorMessage: "value must not be empty",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "value must be atleast 3 characters",
    },
    isString: {
      errorMessage: "value must be a string",
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
