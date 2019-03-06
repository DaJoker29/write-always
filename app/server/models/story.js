import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    isPremium: { type: Boolean, default: () => false },
    description: { type: String }
  },
  { versionKey: false, timestamps: true }
);

export default model('Story', schema);
