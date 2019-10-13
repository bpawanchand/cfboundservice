const express = require('express');
const cfenv = require('cfenv');
const app = express();
const appEnv = cfenv.getAppEnv('vcap');
const connectDB = require('../model/connectDB');
const port = appEnv.port || 5000;

// Parse Request Body of the app using epxress.json
app.use(express.json({ extended: false }));

// Runs only in the case of Local Environment
if (appEnv.isLocal) {
  app.get('/', (req, res, next) => {
    res.send(`Application is running on port ${port}...`);
  });
}
// Connect DB
connectDB();

// Integrate Routes to App
app.use('/user', require('../routes/user'));
// app.use('/actor', require('../routes/actor'));
// app.use('/movie', require('../routes/movie'));

// Assign PORT to express
app.listen(port, () => {
  console.log(`Application is running on port ${port}...`);
});
