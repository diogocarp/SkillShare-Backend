import mongoose, { Document, Schema } from 'mongoose';
import { User } from './User';

export interface Post extends Document {
  userEmail: string;
  title: string;
  description: string;
  image: string;
}

const PostSchema = new Schema<Post>({
  userEmail: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model<Post>('Post', PostSchema);
