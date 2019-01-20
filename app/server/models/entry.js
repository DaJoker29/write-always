import { Schema, model } from 'mongoose';
import { generate } from 'shortid';
import uniqueValidator from 'mongoose-unique-validator';

const prefix = 'en';

const entrySchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      default: () => `${prefix}${generate()}`,
      unique: true
    },
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    notebook: { type: Schema.Types.ObjectId, ref: 'Notebook' }
  },
  { versionKey: false, timestamps: true }
);

entrySchema.plugin(uniqueValidator);

export default model('Entry', entrySchema);
