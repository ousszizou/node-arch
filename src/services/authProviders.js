import axios from "axios";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/user.model.js";

/**
 * Local Strategy
 * This strategy allows incoming
 * requests to authenticate using 
 * username and password.
 */
const localOptions = {
  usernameField: 'email'
};

