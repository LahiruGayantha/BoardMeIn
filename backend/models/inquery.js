var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Guest = require('./guest');
var Owner = require('./owner');

var InquirySchema = new Schema({
  user_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'user',
      required: true,
    },
  ],
  inquirytype: {
    type: String,
    required: true,
    enum: ['Place','System','Other']
  },
  reason: {
    type: String,
    required : true ,
  },
  user: {
    type: String,
    required: true,
    enum: ['Guest', 'Owner'],
  },
});

module.exports = mongoose.model('Inquiry', InquirySchema);
