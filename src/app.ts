import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import todoroutes from './routes/todoroutes';
import todomodel from './models/todomodule';
import auth from './authenticationMiddlware/auth';
import userrouter from './routes/userroutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL!)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(todoroutes);
app.use(userrouter);
 
app.get('/todo', auth, async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const [todos, count] = await Promise.all([
      todomodel.find({ userId: (req as any).user._id })
        .sort({ date: -1 })
        .limit(limit)
        .skip((page - 1) * limit)
        .exec(),
      todomodel.countDocuments({ userId: (req as any).user._id })
    ]);

    res.json({
      code: 200,
      message: "Found the requested todos from the selected page",
      data: {
        page,
        limit,
        totalPages: Math.ceil(count / limit),
        todos
      }
    });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

