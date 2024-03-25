
import mongoose, { Date, Document, Schema } from 'mongoose';

export interface User extends Document {
  id: number;   
  username: string;
  email: string;
  password: string;
  
}

const UserSchema = new Schema<User>({
  id: {type: Number, required: true, unique: true},
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<User>('User', UserSchema);

