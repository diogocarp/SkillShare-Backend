
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {

  try {

    const count = await mongoose.model('User').countDocuments();
    const id = count + 1;
    const { username, email, password, skills } = req.body;  
    const user = new User({ id, username, email, password, skills });
    await user.save();
    res.status(201).json(user);

  } catch (error:any) {

    res.status(400).json({ message: error.message });

  }
});



router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:email', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.json(user);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});



router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { username, email, password, skills } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, email, password, skills }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
