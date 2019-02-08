import { Schema, model } from 'mongoose';
import { generate } from 'shortid';
import token from 'random-token';
import uniqueValidator from 'mongoose-unique-validator';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const prefix = 'us';

const todoSchema = new Schema(
  {
    text: { type: String, required: true },
    isCompleted: { type: Boolean, required: true, default: () => false }
  },
  { versionKey: false, timestamps: true }
);

const userSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      default: () => `${prefix}${generate()}`,
      unique: true
    },
    token: { type: String, default: token(128), select: false },
    dateJoined: { type: Date, default: Date.now },
    dateLastLogin: { type: Date, default: Date.now },
    email: { type: String, required: true, unique: true, select: false },
    displayName: { type: String, default: 'New School Hipsteracho' },
    location: { type: String, default: 'Narnia', required: true },
    url: { type: String },
    bio: { type: String },
    fbUserID: { type: String, select: false },
    fbUserAccess: { type: String, select: false },
    todos: {
      type: [todoSchema],
      required: true,
      default: () => [],
      select: false
    }
  },
  { versionKey: false }
);

userSchema.plugin(uniqueValidator);
userSchema.plugin(mongooseLeanVirtuals);

userSchema.virtual('profileURL').get(function() {
  return `/author/${this.uid}`;
});

userSchema.virtual('/notebooksURL').get(function() {
  return `/notebooks?ID=${this.uid}`;
});

export default model('User', userSchema);
