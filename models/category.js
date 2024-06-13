const mongoose = require('mongoose');
const Product = require('./product');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true },
});

categorySchema.virtual('url').get(function() {
  return `/categories/${this._id}`;
})

categorySchema.pre('findOneAndDelete', async function(next) { 
  const categoryId = this.getQuery()['_id'];
  await Product.updateMany(
    { categories: categoryId },
    { $pull: { categories: categoryId }}
  )
  next();
})

module.exports = mongoose.model('Category', categorySchema);