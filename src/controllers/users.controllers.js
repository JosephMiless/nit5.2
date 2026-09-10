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