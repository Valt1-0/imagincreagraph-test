import mongoose from 'mongoose'

/* Schema will correspond to a collection in your MongoDB database. */
const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  description: {

    required: [true],
    type: String,
  },
  image_url: {

    required: [true],
    type: String,
  },
  image_alt: {

    required: [true],
    type: String,
  },

})

export default mongoose.models.Products || mongoose.model('Products', ProductsSchema)
