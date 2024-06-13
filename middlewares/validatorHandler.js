const { body, validationResult } = require('express-validator');

module.exports.validationResult = validationResult;

module.exports.validateString = (bodyName, options = {}) => {
  let {min, max} = options;
  if (min === undefined) min = 0;
  if (max === undefined) max = 100;

  return body(bodyName)
    .trim()
    .escape()
    .isString().withMessage(`${bodyName} must be a string`)
    .isLength({min, max}).withMessage(`${bodyName} must be between ${min} and ${max} characters`);
};

module.exports.validateName = (bodyName = 'name', options = {}) => {
  let {min, max} = options;
  if (min === undefined) min = 3;
  if (max === undefined) max = 30;

  return body(bodyName)
    .trim()
    .escape()
    .isString().withMessage(`${bodyName} must be a string`)
    .isLength({min, max}).withMessage(`${bodyName} must be between ${min} and ${max} characters`);
};

module.exports.validateNumber = (bodyName = 'number') => {
  return body(bodyName)
    .trim()
    .escape()
    .isNumeric().withMessage(`${bodyName} must be a number`)
};

module.exports.validateMongoId = (bodyName = '_id') => {
  return body(bodyName)
    .trim()
    .escape()
    .isMongoId().withMessage(`${bodyName} must be a valid ObjectId`)
};