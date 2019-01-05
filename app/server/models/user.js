import { Schema, model } from 'mongoose';
import { generate } from 'shortid';
import token from 'random-token';
import uniqueValidator from 'mongoose-unique-validator';

// FIXME: dateLastLogin should be updated upon each successful authentication and authenticated request
// TODO: Add virtuals for attaching user posts, comments, etc.

const userSchema = new Schema({
  uid: { type: String, required: true, default: generate, unique: true },
  username: { type: String, required: true, unique: true, select: false },
  token: { type: String, default: token(128), select: false },
  dateJoined: { type: Date, default: Date.now, select: false },
  dateLastLogin: { type: Date, default: Date.now, select: false },
  email: { type: String, required: true, select: false },
  displayName: { type: String, default: 'New School Hipsteracho' }
  /**
   * Consider adding these fields down the road
   * url
   * books
   * bio
   * location
   */
});

userSchema.plugin(uniqueValidator);

export default model('User', userSchema);
