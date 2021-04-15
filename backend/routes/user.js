import express from "express";
const router = express.Router();
import {
  loginUser,
  getOtherUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  confirmEmail,
  followUser
} from "../controllers/user.js";
import protect from "../middlewares/setAuthToken.js";
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/confirmation/:email/:token", confirmEmail);
router
  .route("/profile/:profileid")
  .get(getOtherUserProfile)
  .put(protect, updateUserProfile);
router.route("/:profileId/follow").post(protect,followUser)

export default router;
