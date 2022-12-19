import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { isEmail } from "validator";

/* Schema will correspond to a collection in your MongoDB database. */
const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: [isEmail , 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    required: true,
    type: String,
    minLength : 12,
  },
  image: {

    type: String,
    default: faker.image.avatar(),
  },
  test:{
    type: String,
  }

})

export default mongoose.models.Users || mongoose.model('Users', UsersSchema)
