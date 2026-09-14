const { registerUserController} = require("../controllers/users.controllers");
const userRouter = require("express").Router();


userRouter.post('/register', registerUserController);
// userRouter.post('/login', loginUserController);

module.exports = userRouter;