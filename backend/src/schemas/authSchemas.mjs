export const authSchema = {
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
    email: {
      notEmpty: {
        errorMessage: "email must not be empty",
      },
      isLength: {
        options: { min: 5 },
        errorMessage: "email must be atleast 3 characters",
      },
      isString: {
        errorMessage: "email must be a string",
      },
    },
    password: {
      notEmpty: {
        errorMessage: "password must not be empty",
      },
      isLength: {
        options: { min: 7 },
        errorMessage: "password must be atleast 3 characters",
      },
      isString: {
        errorMessage: "password must be a string",
      },
    },
    county: {
      notEmpty: {
        errorMessage: "county must not be empty",
      },
      isLength: {
        options: { min: 5 },
        errorMessage: "county must be atleast 5 characters",
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
export const loginSchema = {
    username: {
      notEmpty: {
        errorMessage: "name must not be empty",
      },
      isLength: {
        options: { min: 3 },
        errorMessage: "name must be atleast 3 characters",
      },
      isString: {
        errorMessage: "name must be a string",
      },
    },
    password: {
      notEmpty: {
        errorMessage: "name must not be empty",
      },
      isLength: {
        options: { min: 7 },
        errorMessage: "name must be atleast 3 characters",
      },
      isString: {
        errorMessage: "name must be a string",
      },
    },
  };
  