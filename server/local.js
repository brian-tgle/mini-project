import app from './server.js';
import { config } from './app/config/index.js';

// set port, listen for requests
const PORT = config.env.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
