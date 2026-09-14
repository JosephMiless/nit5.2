const {
  createUser,
  findUserByEmail,
} = require("../repositories/users.repositories");
const { registerUserSchema, loginUserSchema } = require("../validators/users");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const aToken = require("../config/jwt");

const registerUserController = async (req, res) => {
  try {
    // validate user input and return error if needed
    const { error, value } = registerUserSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // destructing fields into value
    const { firstName, lastName, email, password } = value;

    // check if user exists
    const userExixts = await findUserByEmail(email);

    // return error if user exsts
    if (userExixts) return res.status(400).json({ error: "User exists" });

    // encrypt user's password
    const hashedPassword = await hashPassword(password);

    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    // save user's details to db
    const user = await createUser(newUser);

    const { password: pass, ...safeUser } = user;

    return res
      .status(201)
      .json({ message: "Account created successfully", safeUser });
  } catch (error) {
    console.log(`Error registering user. Error: ${error}`);

    return res.status(500).json({ error: `Internal server error` });
  }
};

const loginUserController = async (req, res) => {
  try {
    // validate user's input
    const { error, value } = loginUserSchema.validate(req.body);

    if (error) return res.status(400).json({ error: error.message });

    const { email, password } = value;

    // check if user exists
    const userExists = await findUserByEmail(email);

    if (!userExists) {
      return res
        .status(404)
        .json({ error: "User not found. Kindly create an account to login" });
    }

    // validate the user's password
    const isMatch = await comparePassword(password, userExists.password);

    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // sign access token with user's details
    const accessToken = aToken({ id: userExists.id, email: userExists.email });

    // return token to user
    return res.status(200).json({ 
      message: "Logged in successfully",
      email: userExists.email,
      id: userExists.id,
      accessToken 
    });
  } catch (error) {
    console.log(`Error logging in user. Error: ${error}`);

    return res.status(500).json({ error: `Internal sever error` });
  }
};

module.exports = { registerUserController, loginUserController };
