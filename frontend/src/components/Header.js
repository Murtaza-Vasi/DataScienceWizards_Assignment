import React from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	title: {
		flexGrow: 1,
	},
	btn: {
		color: '#fff',
	},
}));

const Header = () => {
	const classes = useStyles();

	const onClickHandler = () => {
		console.log('logout');
	};

	return (
		<div>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						Demo
					</Typography>
					<Button className={classes.btn} onClick={onClickHandler}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
