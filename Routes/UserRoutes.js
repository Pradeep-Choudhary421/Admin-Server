const express =require("express");
const {createUser,getallusers, updateUser, deleteUser,loginUser} =require("../Controlers/UserControler");
const { authenticate,checkAdmin } = require("../middleware/auth");
const router = express.Router();

router.post("/create",createUser)
router.get("/get", checkAdmin, getallusers)
router.put("/update/:id",updateUser)
router.delete("/delete/:id",deleteUser)
router.post("/login",loginUser)
module.exports = router;