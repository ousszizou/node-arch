import { Router } from "express";
import Controller from "../controllers/auth.controller";

const router = Router();

export default (app) => {
  app.use("/auth", router);

  router.post("/register", Controller.register);
  router.post("/login", Controller.login);
  router.post("/github", Controller.oAuth);
}
