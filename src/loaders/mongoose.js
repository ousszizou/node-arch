import mongoose from 'mongoose';
import config from "../config";

export default async () => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };
  const dbURL = config.db.databaseURL;
  const connection = await mongoose.connect(dbURL, options);
  return connection.connection.db;
}
