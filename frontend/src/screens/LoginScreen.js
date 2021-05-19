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
	Container,
} from '@material-ui/core';

import Loader from '../components/Loader';
import Message from '../components/Message';

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

const LoginScreen = () => {
	const classes = useStyles();

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = useState('');

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const validatePassword = () => {
		let passwordMinLength = 8;
		let passwordMaxLength = 15;

		console.log(
			password,
			password.length >= passwordMinLength.toFixed,
			password.length <= passwordMaxLength
		);

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
			const userData = { email, password };
			const { data } = await axios.post(
				'http://localhost:5000/users/login',
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
					<Container>
						<img src='images/login.jpg' className={classes.image} alt='Login' />
					</Container>
				</Grid>
				<Grid item xs={12} lg={6} className={classes.formContainer}>
					<Typography
						align='center'
						variant='h4'
						display='block'
						className={classes.title}
					>
						User Login
					</Typography>
					<form
						onSubmit={onSubmitHandler}
						className={classes.form}
						id='login-form'
					>
						<FormControl fullWidth>
							<TextField
								type='text'
								label='Email'
								name='email'
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
								name='password'
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
						<ButtonGroup variant='outlined'>
							<Button type='submit'>Login {loading && <Loader />}</Button>
							<Button onClick={clearInputs}>Reset</Button>
						</ButtonGroup>
					</form>
					<Typography>
						Don't have an account?
						<Link to='/register' className={classes.link}>
							{' '}
							Register
						</Link>
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
};

export default LoginScreen;
