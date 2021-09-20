const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: '../config.env' });

const connectDb = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://admin:admin@musical.eieqj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('DB Connected');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
