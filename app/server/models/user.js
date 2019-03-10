import { Schema, model } from 'mongoose';
import token from 'random-token';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, select: false },
    username: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    lastActive: { type: Date, default: () => Date.now() },
    role: { type: String, default: 'reader', select: false },
    token: { type: String, default: token(128), select: false },
    location: { type: String },
    url: { type: String },
    bio: { type: String },
    fbUserID: { type: String, select: false },
    fbUserAccess: { type: String, select: false }
  },
  { versionKey: false, timestamps: true }
);

userSchema.plugin(uniqueValidator);

export default model('User', userSchema);
