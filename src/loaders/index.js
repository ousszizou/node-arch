import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import Logger from "./logger";

export default async ({ app }) => {
  /**
   * Create mongoConnection and connect to the db and return db connection.
   */
  await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  /**
   * Laods express essentials
   */
  await expressLoader({ app });
  Logger.info("✌️ Express loaded");
};
