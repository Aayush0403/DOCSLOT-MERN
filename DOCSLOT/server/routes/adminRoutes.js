const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  deleteDoctorController,
  changeAccountStatusController,
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET METHOD || DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

//POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

//POST DELETE DOCTOR
router.post(
  "/deleteDoctor",
  authMiddleware,
  deleteDoctorController
);



module.exports = router;
