import mongoose from 'mongoose';
import bcryptUtils from '../utils/bcrypt.utils';
import { DB_COLLECTIONS } from '../config/MongoDB.config';

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  verified: boolean;
  createAt: Date;
  updatedAt: Date;
  comparePassword(val: string): Promise<boolean>;
  omitPassword(): Omit<UserDocument, 'password'>;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false },
  },
  { timestamps: true } //Automatically add createdAt and updatedAt fields
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcryptUtils.hashValue(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (val: string) {
  return bcryptUtils.compareValue(val, this.password);
};

userSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model<UserDocument>(
  DB_COLLECTIONS.Users,
  userSchema,
  DB_COLLECTIONS.Users
);

export default UserModel;
