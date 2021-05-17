import React, { useRef, useState } from 'react';
import { Button, Card, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from "react-router-dom";
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

export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const classes = useStyles();

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Passwords do not match');
		}

		try {
			setError('');
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			setLoading(false);
			history.push("/");
		} catch {
			setLoading(false);
			setError('Failed to create an account');
		}
	}

	return (
		<>
			<Card className={classes.card}>
				<div className={classes.boxVerticalCenter}>
					<h1 className={classes.title}>Sign up</h1>
				</div>
				{error && <Alert severity="error">{error}</Alert>}
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
					<TextField
						id="password"
						label="Password"
						type="password"
						autoComplete="Password"
						variant="outlined"
						className={classes.textField}
						inputRef={passwordRef}
						fullWidth
						required
					/>
					<TextField
						id="password-confirm"
						label="Confirm Password"
						type="password"
						autoComplete="Password-confirm"
						variant="outlined"
						className={classes.textField}
						inputRef={passwordConfirmRef}
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
						Sign up
					</Button>
				</form>
			</Card>
			<div className={classes.boxHorizontalCenter}>
				Already have an account?<p>&nbsp;</p><Link to="/login">Log in</Link>
			</div>
		</>
	);
}
