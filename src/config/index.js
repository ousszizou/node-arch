import dotenv from 'dotenv';

const envFound = dotenv.config();

if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

/**
 * Current Environment (dev,test,prod)
 * Set the NODE_ENV to 'dev' by default
 */
export const env = process.env.NODE_ENV || "dev";

// Development Configurations
const dev = {
  /**
   * App Configurations
   */
  app: {
    port: process.env.DEV_APP_PORT || 3000,
    /**
     * Used by morgan logger
     */
    log: {
      format: process.env.LOG_FORMAT || "dev",
    },
  },
  /**
   * Database Configurations
   */
  db: {
    databaseURL: process.env.MONGODB_URI,
  },
  /**
   * Your secret sauce
   */
  secure: {
    jwtSecret: process.env.JWT_SECRET,
  },
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api/v1',
  },
};

// Test Configurations
const test = {
  app: {
    port: process.env.TEST_APP_PORT || 5000,
  },
  db: {
    databaseURL: process.env.MONGODB_URI_TEST,
  },
};

const config = {
  dev,
  test,
};

export default config[env];
