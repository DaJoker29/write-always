import { Schema, model } from 'mongoose';
import { generate } from 'shortid';
import uniqueValidator from 'mongoose-unique-validator';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

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
entrySchema.plugin(mongooseLeanVirtuals);

export default model('Entry', entrySchema);
