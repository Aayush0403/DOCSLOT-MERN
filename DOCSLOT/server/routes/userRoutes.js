const express = require("express");
const {
  loginController,
  registerController,
  authController,
  deleteUserController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDocotrsController,
  bookeAppointmnetController,
  updateUserController,
  userAppointmentsController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);


//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//Apply Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//Notifiaction  Doctor || POST
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);
//Notifiaction  Doctor || POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

//GET ALL DOC
router.get("/getAllDoctors", authMiddleware, getAllDocotrsController);

//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);

// Delete User
router.post(
  "/deleteUser",
  authMiddleware,
  deleteUserController
);

//User Profile || POST
router.post(
  "/user-profile",
  authMiddleware,
  updateUserController
);
// Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router;
