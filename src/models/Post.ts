import mongoose, { Document, Schema } from 'mongoose';


export interface Post extends Document {
  username: string;
  date: Date;
  title: string;
  description: string;
  image: string;
}

const PostSchema = new Schema<Post>({
  username: { type: String, required: true },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model<Post>('Post', PostSchema);
