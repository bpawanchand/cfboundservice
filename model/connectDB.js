const mongoose = require('mongoose');
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv('vcap');
var uri;
if (appEnv.isLocal) {
  uri = 'mongodb://localhost:27017/CFDB';
} else {
  uri = appEnv.services.mlab[0].credentials.uri;
}

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log(`App connected to DB Service...`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
