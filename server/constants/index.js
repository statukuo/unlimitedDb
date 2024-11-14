const ORIGIN = '*';
const SERVER_PORT = process.env.SERVER_PORT || 5000;

// for "atlas" edit MONGO_URI in -> .env file || for "community server" edit <MyDatabase>
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/MyDatabase';
const MONGO_OPTIONS = {};

const JWT_SECRET = process.env.JWT_SECRET || 'unsafe_secret';

module.exports = {
  ORIGIN,
  SERVER_PORT,
  MONGO_URI,
  MONGO_OPTIONS,
  JWT_SECRET,
};
