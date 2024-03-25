
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Post from '../models/Post';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {

  try {

    const count = await mongoose.model('Post').countDocuments();
    const id = count + 1;
    const { userEmail, title, description, image } = req.body;  
    const post = new Post({ id, userEmail, title, description, image });
    await post.save();
    res.status(201).json(post);

  } catch (error:any) {

    res.status(400).json({ message: error.message });

  }
});


router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', async (req: Request, res: Response) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(post);
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  });

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, description, image } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, description, image }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Post deleted' });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
