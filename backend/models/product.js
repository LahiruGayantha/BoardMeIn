const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    images: {
      type: Object,
      required: true
    },
    location:{
        type:String
    },
    category: {
      type: String,
      required: true,
      enum: ['SingleRoom', 'SharedRoom', 'Home', 'Annex'],
    },
    address: {
      type: String,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Products', productSchema);
