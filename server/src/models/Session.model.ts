import mongoose, { mongo } from 'mongoose';
import { DB_COLLECTIONS } from '../config/MongoDB.config';
import dateUtils from '../utils/date.utils';

export interface SessionDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  userAgent?: string; // helps to know from which device user logged in
  createdAt: Date;
  expiresAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: DB_COLLECTIONS.Users,
    required: true,
    index: true, //use it as index, cuz we will search by userId
  },
  userAgent: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now, required: true },
  expiresAt: {
    type: Date,
    default: dateUtils.thirtyDaysFromNowInMS(),
    required: true,
  },
});

const SessionModel = mongoose.model<SessionDocument>(
  DB_COLLECTIONS.Sessions,
  sessionSchema,
  DB_COLLECTIONS.Sessions
);

export default SessionModel;
