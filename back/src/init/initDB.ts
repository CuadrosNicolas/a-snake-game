import * as mongoose from 'mongoose';
/**
 * Return a promise of the db connection
 * @return {Promise<mongoose>}
 */
export function connectDB() {
  const uri = `mongodb://${process.env.MONGO || 'localhost'}:27017`;
  console.warn(process.env, uri);
  return mongoose.connect(uri, (err) => {
    if (err) {
      console.log(JSON.stringify(err));
      throw new Error("Mongodb is not reachable.")
    } else {
      console.log('MONGO DB CONNECTED');
    }
  });
}