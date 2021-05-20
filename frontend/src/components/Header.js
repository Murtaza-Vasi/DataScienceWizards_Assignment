import React from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	appBar: {
		backgroundColor: '#2C5476',
	},
	title: {
		flexGrow: 1,
		fontSize: '16px',
	},
	btn: {
		color: '#fff',
		fontSize: '15px',
	},
}));

const Header = () => {
	const classes = useStyles();

	const onClickHandler = () => {
		console.log('logout');
	};

	return (
		<div>
			<AppBar position='static' className={classes.appBar}>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						DATA SCIENCE WIZARDS
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
