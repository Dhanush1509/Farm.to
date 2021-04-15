import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      default:'India'
    },
    profile: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
      type:String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
 

  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.follow = function (user_id) {
  if (this.followers.indexOf(user_id) === -1) {
    this.followers.push(user_id);
  }
  return this.save();
};
userSchema.methods.addFollower = function (user_id) {
   if (this.following.indexOf(user_id) === -1) {
     this.followers.push(user_id);
   }
   return this.save();
};
const User = mongoose.model("User", userSchema);
export default User;




