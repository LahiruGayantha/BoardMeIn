const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  tt:{
    type:Object,
  }
});

module.exports = mongoose.model('User', userSchema);
