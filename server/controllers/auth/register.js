const joi = require('joi');
const bcrypt = require('bcrypt');
const Account = require('../../models/Account');
const { signToken } = require('../../middlewares/jsonwebtoken');

async function register(request, response) {
  try {
    // Validate request data
    await joi
      .object({
        email: joi.string().required().email({ tlds: { allow: false } }),
        username: joi.string().required(),
        password: joi.string().required(),
      })
      .validateAsync(request.body);
  } catch (error) {
    return response.status(400).json({
      error: 'ValidationError',
      message: error.message,
    });
  }

  try {
    const { email, username, password } = request.body;

    // Verify account username as unique
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return response.status(400).json({
        error: email,
        message: 'An account already exists with that "email"',
      });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create account
    const newAccount = new Account({ email, username, password: hash });
    await newAccount.save();

    // Remove password from response data
    newAccount.password = undefined;
    delete newAccount.password;

    // Generate access token
    const token = signToken({ uid: newAccount._id, role: newAccount.role });

    response.status(201).json({
      message: 'Succesfully registered',
      data: newAccount,
      token,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send();
  }
}

module.exports = register;
