import { Schema, Types, model } from "mongoose";
import { genSalt, hash, compare } from "bcryptjs";

/**
 * User Roles
 */
const roles = ["user", "admin"];

/**
 * User Schema
 */
const userSchema = new Schema(
  {
    email: {
      type: String,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
    username: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
    },
    services: {
      linkedin: String,
      facebook: String,
      twitter: String,
      github: String,
      google: String,
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
    picture: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

/**
 * Schema Hooks
 */
userSchema.pre("save", async (next) => {
  const user = this;
  
  try {
    // generate salt (randomly generated string of chars)
    const rounds = env === "test" ? 1 : 10;
    genSalt(rounds, (err, salt) => {
      if (err) return next(err);
      // encrypt password using the salt
      const hashedPass = await hash(user.password, salt);
      // overwrite password with salted + hashed one
      user.password = hashedPass;
      next();
    });
  } catch (error) {
    return next(error);
  }
});


/**
 * Schema Methods
 * 
 * This allows us to use a method
 * from the model instance and manipulate
 * its context.
 */
userSchema.method({
  passwordMatches: async (password) => compare(password, this.password),
});

/**
 * Statics
 */
userSchema.statics = {
  roles,
  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, Error>}
   */
  get: async (id) => {
    try {
      let user;
      if (Types.ObjectId.isValid(id)) {
        user = await this.findById(id).exec();
      }
      if (user) {
        return user;
      }
      throw new Error({
        message: 'User does not exist',
        status: 404,
      });
    } catch (error) {
      throw error;
    }
  },
};

export default model("user", userSchema);
