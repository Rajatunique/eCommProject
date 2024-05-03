/**
 * POST localhost:8888/ecomm/api/v1/categories
 */

const category_controller = require("../controllers/category.controller")
const authMw = require("../middlewares/auth.mw")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/categories",[authMw.verifyToken,authMw.isAdmin],category_controller.createNewCategory)
}