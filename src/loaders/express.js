import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import { NotFound, ErrorHandler } from "../utils/middlewares";
import config from "../config";

import routes from "../api";

export default ({ app }) => {
  /**
   * Enable cors on all actions
   */
  app.use(cors());

  /**
   * Transform string to JSON.
   */
  app.use(bodyParser.json());

  /**
   * Secure Express apps by setting various HTTP headers
   */
  app.use(helmet());

  /**
   * Home Endpoint (/)
   */
  app.get("/", (req, res) => {
    res.json({
      message: "👋 Hello Awesomes ✨✨",
    });
  });

  // Load API routes
  app.use(config.api.prefix, routes());

  /**
   * Check API health.
   */

  /**
   * Catch 404 and forward to error handle.
   */
  app.use(NotFound);

  /**
   * Global Error Catcher (Error Handler)
   */
  app.use(ErrorHandler);
};
