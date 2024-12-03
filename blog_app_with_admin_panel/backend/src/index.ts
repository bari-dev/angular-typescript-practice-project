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


import jwt from 'jsonwebtoken'
import { User } from './models/User';

const secretKey = 'secretKey'

function generateToken(userId: number): string {
  const payload = { userId };
  const token   = jwt.sign(payload, secretKey, { expiresIn: '1h'});

  return token
}

function verifyToken(token: string){
  try{
    return jwt.verify(token, secretKey)
  }catch(err){
    return null;
  }
}

async function authenticateJWT(req: Request & { user: User }, res: Response, next: Function){
  console.log('Verifying the Token')
  const token = req.header('Authorization')?.replace('Barear', '')
  if(!token){
    return res.status(401).json({message: 'Access Denied.'});
  }

  const verified = verifyToken(token)

  if (!verified){
    return res.status(401).json({message: 'Invalid Token.'})
  }

  try {
    const user = await User.findByPk((verified as any).userId);
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: 'User not found.' });
    }
  }catch (err) {
    return res.status(500).json({ message: 'Server error.', error: (err as any).message });
  }

  console.log('Verified the Token')
}

app.get('/test', authenticateJWT as any, (req, res) => {
  res.json((req as any).user)
})

console.log(generateToken(1))