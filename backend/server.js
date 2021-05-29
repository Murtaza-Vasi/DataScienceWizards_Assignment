import express from 'express';
import path from 'path';
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

// If any other request comes other than the routes defined then send the homepage
const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'frontend', 'build')));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
