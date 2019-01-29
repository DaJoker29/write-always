import { Schema, model } from 'mongoose';
import { generate } from 'shortid';
import uniqueValidator from 'mongoose-unique-validator';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const prefix = 'nb';

const notebookSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      default: () => `${prefix}${generate()}`,
      unique: true
    },
    title: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    isPrivate: { type: Boolean, default: false, required: true },
    isShared: { type: Boolean, default: false, required: true }
  },
  { versionKey: false, timestamps: true }
);

notebookSchema.plugin(uniqueValidator);
notebookSchema.plugin(mongooseLeanVirtuals);

notebookSchema.virtual('notebookURL').get(function() {
  return `/notebook/${this.uid}`;
});

notebookSchema.virtual('createEntryURL').get(function() {
  return `/entry/create?n=${this.uid}`;
});

export default model('Notebook', notebookSchema);
