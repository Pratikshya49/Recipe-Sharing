import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, minlength: 6, required: true, trim: true },
    isAdmin: { type: Boolean, required: true, default: false },
    imageURL: { type: String },
  },
  { timestamps: true }
)

// In Mongoose, async pre-save hooks automatically return a Promise.
// We don't call next() when using async/await.
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model('User', userSchema)

export default User



