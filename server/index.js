require('dotenv').config(); // Secures variables
const app = require('./utils/app'); // Backend App (server)
const mongo = require('./utils/mongo'); // MongoDB (database)
const { SERVER_PORT } = require('./constants');
const authRoutes = require('./routes/auth');
const cardRoutes = require('./routes/cards');

async function bootstrap() {
  await mongo.connect();

  app.get('/', (req, res) => res.status(200).json({ message: 'Hello World!' }));
  app.get('/healthz', (req, res) => res.status(200).send());
  app.use('/auth', authRoutes);
  app.use('/cards', cardRoutes);

  app.listen(SERVER_PORT, () => {
    console.log(`✅ Server is listening on port: ${SERVER_PORT}`);
  });
}

bootstrap();
