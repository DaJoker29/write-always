import { Schema, model } from 'mongoose';
import { generate } from 'shortid';
import token from 'random-token';
import uniqueValidator from 'mongoose-unique-validator';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const userSchema = new Schema(
  {
    uid: { type: String, required: true, default: generate, unique: true },
    username: { type: String, required: true, unique: true, select: false },
    token: { type: String, default: token(128), select: false },
    dateJoined: { type: Date, default: Date.now },
    dateLastLogin: { type: Date, default: Date.now },
    email: { type: String, required: true, select: false },
    displayName: { type: String, default: 'New School Hipsteracho' },
    location: { type: String, default: 'Narnia', required: true },
    books: [{ type: String, select: false }],
    url: { type: String },
    bio: { type: String }
  },
  { versionKey: false }
);

userSchema.plugin(uniqueValidator);
userSchema.plugin(mongooseLeanVirtuals);

userSchema.virtual('profileURL').get(function() {
  return `/author/${this.uid}`;
});

export default model('User', userSchema);
