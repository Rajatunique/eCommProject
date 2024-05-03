/**
 * POST localhost:8888/ecomm/api/v1/auth/signup
 * 
 * I need to intercept this
 */
const authController = require("../controllers/auth.controller")
const authMw = require("../middlewares/auth.mw")

module.exports = (app) => {
    app.post("/ecomm/api/v1/auth/signup",[authMw.verifySignUpBody], authController.signup)//handover to the right controller

    /**
     * route for
     * POST localhost:8888/ecomm/api/v1/auth/signin
     */
    app.post("/ecomm/api/v1/auth/signin",[authMw.verifySignInBody], authController.signin)//signin api is ready


}//api request - middleware - controller