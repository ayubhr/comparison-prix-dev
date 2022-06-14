module.exports = app => {
const auth = require ('../controllers/authController.js');
var router = require("express").Router();

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post("/logout", auth.logout);

app.use("/api/v1/auth", router);
};
