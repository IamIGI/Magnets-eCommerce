import mongoose from 'mongoose';
import { DB_COLLECTIONS } from '../config/MongoDB.config';
import VerificationCodeType from '../constants/verificationCodeType.constants';

export interface VerificationCode extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  type: VerificationCodeType;
  expiresAt: Date;
  createdAt: Date;
}

const VerificationCodeSchema = new mongoose.Schema<VerificationCode>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: DB_COLLECTIONS.Users,
    required: true,
    index: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, required: true },
  expiresAt: { type: Date, required: true },
});

const VerificationCodeModel = mongoose.model<VerificationCode>(
  DB_COLLECTIONS.VerificationCodes,
  VerificationCodeSchema,
  DB_COLLECTIONS.VerificationCodes // how the collection is named in the database (just visual)
);

export default VerificationCodeModel;
