import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  images: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) => arr.length > 0,
      message: 'At least one image is required'
    }
  },
  imageIds: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) => arr.length > 0,
      message: 'At least one imageId is required'
    }
  },
  category: {
    type: String,
    enum: ['Men', 'Women', 'Kids', 'Unisex'],
    required: true
  },
  type: {
    type: String,
    enum: ['Topwear', 'Bottomwear', 'Footwear', 'Accessories'],
    required: true
  },
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'],
    required: true
  },
  condition: {
    type: String,
    enum: ['New', 'Like New', 'Good', 'Acceptable'],
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  redeemCost: {
    type: Number,
    default: 10,
    min: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Item', itemSchema);
