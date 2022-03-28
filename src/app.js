import express from "express";
import logger from "./loaders/logger";
import config from "./config";

const startServer = async () => {
  const app = express();
  const port = config.app.port;

  await require("./loaders").default({ app });

  app.listen(port, (err) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    logger.info(`
      ####################################
      🛡️  Server listening on port: ${port} 🛡️
      ####################################
    `);
  });
};

startServer();
