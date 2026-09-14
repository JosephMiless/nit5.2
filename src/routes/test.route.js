const testEndpoint = require("../controllers/test");
const { authorize, adminAuth } = require("../middleware/auth");

const testRouter = require("express").Router();

testRouter.get('/', authorize, adminAuth, testEndpoint);

module.exports = testRouter;