import express, { Request,  Response, Router } from 'express';
import dotenv from 'dotenv';

import categoryRoute from './routes/category.routes';
import postRoute from './routes/post.routes';

// databse import
import './database/index';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/posts', postRoute);
app.get('/', (req: Request, res: Response)=>{
  res.json({ 'text': 'Hello World' })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
