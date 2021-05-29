const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchma = new Schema(
  {
    pId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      require: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    pRatings: {
      zero: {type: Number, default: 0},
      one: {type: Number, default: 0},
      two: {type: Number, default: 0},
      three: {type: Number, default: 0},
      four: {type: Number, default: 0},
      five: {type: Number, default: 0},
    },
    oRatings: {
      zero: {type: Number, default: 0},
      one: {type: Number, default: 0},
      two: {type: Number, default: 0},
      three: {type: Number, default: 0},
      four: {type: Number, default: 0},
      five: {type: Number, default: 0},
    },
    comments: [
      {
        gId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Guest',
          //require: true,
        },
        pRating: {type: Number, default: 0},
        oRating: {type: Number, default: 0},
        text: {type: String, require: true},
        replies: [{user: {type: String}, text: {type: String}}],
      },
    ],
  },
  {timestamps: true},
);

const Comment = mongoose.model('Comment', commentSchma);
