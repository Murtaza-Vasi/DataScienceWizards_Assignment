import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Message = ({ message, variant, open, setOpen }) => {
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return (
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			open={open}
			autoHideDuration={6000}
			onClose={() => setOpen(!open)}
		>
			<Alert onClose={handleClose} severity={variant}>
				{message}
			</Alert>
		</Snackbar>
	);
};

Message.defaultProps = {
	message: '',
	variant: 'error',
};

export default Message;
