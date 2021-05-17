import React, { useRef, useState } from 'react';
import { Button, Card, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles({
	card: {
		padding: 20,
		marginTop: 20,
		marginBottom: 20,
	},
	boxVerticalCenter: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	boxHorizontalCenter: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		textAlign: 'center',
		fontSize: 24,
		marginBottom: 20,
	},
	textField: {
		marginTop: 10,
		marginBottom: 10,
	},
	button: {
		marginTop: 10,
		marginBottom: 10,
	},
});

export default function ForgotPassword() {
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const classes = useStyles();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setMessage('');
			setError('');
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage('Check your inbox for further instructions');
		} catch {
			setError('Failed to reset password');
		}

		setLoading(false);
	}

	return (
		<>
			<Card className={classes.card}>
				<div className={classes.boxVerticalCenter}>
					<h1 className={classes.title}>Reset Password</h1>
				</div>
				{error && <Alert severity="error">{error}</Alert>}
				{message && <Alert severity="success">{message}</Alert>}
				<form noValidate autoComplete="off" onSubmit={handleSubmit}>
					<TextField
						id="email"
						label="Email Address"
						type="email"
						autoComplete="email-address"
						variant="outlined"
						className={classes.textField}
						inputRef={emailRef}
						fullWidth
						required
					/>
					<Button
						className={classes.button}
						variant="contained"
						color="primary"
						disabled={loading}
						type="submit"
						fullWidth
					>
						Reset Password
					</Button>
				</form>
			</Card>
			<div className={classes.boxHorizontalCenter}>
				<Link to="/login">Log in instead</Link>
			</div>
		</>
	);
}
