const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  stock: Number,
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  imageUrl: String,
});

productSchema.virtual('url').get(function() {
  return `/categories/${this._id}`;
});

module.exports = mongoose.model('Product', productSchema);