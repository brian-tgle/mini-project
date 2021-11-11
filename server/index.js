import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import { config } from './app/config/index.js';
import { applyPassportStrategy } from './app/utils/passport.js';
import db from './app/models/index.js';
import authController from './app/controllers/auth.controller.js';
import expenseController from './app/controllers/expense.controller.js';
import categoryController from './app/controllers/category.controller.js';
import reportController from './app/controllers/report.controller.js';

dotenv.config();

const app = express();
applyPassportStrategy(passport);
const corsOptions = {
  origin: config.corsOptions.origin
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

db.mongoose
  .connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((error) => {
    console.log('Cannot connect to the database!', error);
    process.exit();
  });

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome!!' });
});

app.use('/api/auth', authController);
app.use('/api/expenses', expenseController);
app.use('/api/categories', categoryController);
app.use('/api/report', reportController);

// set port, listen for requests
const PORT = config.env.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
