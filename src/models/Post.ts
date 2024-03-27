import mongoose, { Document, Schema } from 'mongoose';

export interface Comment {
  username: string;
  comment: string;
}

export interface Post extends Document {
  username: string;
  date: Date;
  title: string;
  description: string;
  image: string;
  comments?: Comment[];
}

const CommentSchema = new Schema<Comment>({
  username: { type: String, required: true },
  comment: { type: String, required: true }
});

const PostSchema = new Schema<Post>({
  username: { type: String, required: true },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  comments: [CommentSchema]
});

export default mongoose.model<Post>('Post', PostSchema);
