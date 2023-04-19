import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birth: String,
  phone: String,
  image: String,
  email: String,
  company: String,
  address: String,
  website: String,
  customField: String,
  dataCustomField: String
})

const Contact = mongoose.model('Contact', ContactSchema)

export default Contact
