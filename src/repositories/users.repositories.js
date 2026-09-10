const User = require("../models/user");


const findUserByEmail = async (email) => {
    return await User.findOne({where: {email}});
};

const createUser = async (userData) => {
    return await User.create(userData);
};

module.exports = {findUserByEmail, createUser};