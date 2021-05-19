import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
	Grid,
	TextField,
	FormControl,
	makeStyles,
	Button,
	ButtonGroup,
	Typography,
} from '@material-ui/core';

import Message from '../components/Message';
import Loader from '../components/Loader';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '650px',
		height: '450px',
	},
	title: {
		fontWeight: 'bold',
	},
	formContainer: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	form: {
		padding: theme.spacing(2),
		height: '350px',
		width: '350px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	link: {
		textDecoration: 'none',
	},
}));

const RegisterScreen = () => {
	const classes = useStyles();

	const [name, setName] = useState('');
	const [nameError, setNameError] = useState(false);
	const [nameErrorMessage, setNameErrorMessage] = useState('');

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = useState('');

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	// const validateName = () => {
	// 	const regex = /[A-Za-z0-9]/;
	// 	console.log(regex.test(name));
	// 	if (name && regex.test(name)) {
	// 		setNameError(false);
	// 		return false;
	// 	} else {
	// 		setNameError(true);
	// 		setNameErrorMessage('The username must not have any special characters');
	// 		return true;
	// 	}
	// };

	const validatePassword = () => {
		let passwordMinLength = 8;
		let passwordMaxLength = 15;

		if (
			password &&
			password.length >= passwordMinLength &&
			password.length <= passwordMaxLength
		) {
			setPasswordErrorMessage('');
			setPasswordError(false);
			return false;
		} else {
			setPasswordErrorMessage(
				`The password should be between ${passwordMinLength} to ${passwordMaxLength} characters`
			);
			setPasswordError(true);
			return true;
		}
	};

	const validateEmail = () => {
		if (email && email.includes('@')) {
			setEmailErrorMessage('');
			setEmailError(false);
			return false;
		} else {
			setEmailErrorMessage(`The email entered is invalid`);
			setEmailError(true);
			return true;
		}
	};

	const clearInputs = () => {
		setName('');
		setEmail('');
		setPassword('');
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		if (validateEmail()) {
			return;
		}
		if (validatePassword()) {
			return;
		}

		setLoading(true);
		try {
			const userData = {
				name,
				email,
				password,
			};

			const { data } = await axios.post(
				'http://localhost:5000/users',
				userData
			);

			clearInputs();

			console.log(data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<div className={classes.root}>
			<Grid container justify='center' alignItems='center' spacing={4}>
				<Grid item xs={12} lg={6}>
					<img
						src='images/login.jpg'
						className={classes.image}
						alt='Register'
					/>
				</Grid>
				<Grid item xs={12} lg={6} className={classes.formContainer}>
					<Typography
						align='center'
						variant='h4'
						display='block'
						className={classes.title}
					>
						User Register
					</Typography>
					<form
						onSubmit={onSubmitHandler}
						className={classes.form}
						id='register-form'
					>
						<FormControl fullWidth>
							<TextField
								type='text'
								label='Username'
								placeholder='Enter your name'
								variant='outlined'
								value={name}
								onChange={(e) => setName(e.target.value)}
								error={nameError}
								margin='normal'
								required
								helperText={nameErrorMessage}
							/>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								type='text'
								label='Email'
								placeholder='Enter your email address'
								variant='outlined'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								error={emailError}
								margin='normal'
								required
								helperText={emailErrorMessage}
							/>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								type='password'
								label='Password'
								placeholder='Enter your password'
								variant='outlined'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								error={passwordError}
								margin='normal'
								fullWidth
								required
								helperText={passwordErrorMessage}
							/>
						</FormControl>
						<br />
						<ButtonGroup>
							<Button variant='outlined' type='submit'>
								Register
								{loading && <Loader />}
							</Button>
							<Button variant='outlined' onClick={clearInputs}>
								Reset
							</Button>
						</ButtonGroup>
					</form>
					<Typography>
						Already have an account?
						<Link to='/' className={classes.link}>
							Login
						</Link>
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
};

export default RegisterScreen;
