import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './db.js';
import { register, login } from './controllers/userController.js';

const app = express();

dotenv.config();
connectDB();

app.use(cors(['http://localhost:3000']));
app.use(express.json());

app.post('/users', register);
app.post('/users/login', login);

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
