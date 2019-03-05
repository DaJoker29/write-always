import { Schema, model } from 'mongoose';

const feedEntrySchema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { versionKey: false, timestamps: true }
);

export default model('FeedEntry', feedEntrySchema);
