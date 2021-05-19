import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			res.status(400);
			throw new Error('User with this email already exists');
		}

		// hashing the password to store in the database
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		if (!user) {
			throw new Error('Error creating user');
		}

		res.json(user);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (user && (await bcrypt.compare(password, user.password))) {
			res.json(user);
		} else {
			throw new Error('Invalid email or password');
		}
	} catch (error) {
		res.json({ error: error.message });
	}
};

export { register, login };
