import React, { useRef, useState } from 'react';
// import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Button, Card, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
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
	}
}));

export default function UpdateProfile() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { currentUser, updateEmail, updatePassword } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const classes = useStyles();
	
	function handleSubmit(e) {
		e.preventDefault();
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Passwords do not match');
		}

		const promises = [];
		setLoading(true);
		setError("");

		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
		}
		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
		}

		Promise.all(promises).then(() => {
			setLoading(false);
			history.push("/");
		}).catch(() => {
			setLoading(false);
			setError("Failed to update account");
		});
	}

	return (
		<>
			{/* <Card>
				<Card.Body>
					<h2 className="text-center mb-4">Update Profile</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email" className="mb-3">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								ref={emailRef}
								placeholder="Enter email"
								defaultValue={currentUser.email}
								required
							/>
						</Form.Group>
						<Form.Group id="password" className="mb-3">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								ref={passwordRef}
								placeholder="Leave blank to keep the same"
							/>
						</Form.Group>
						<Form.Group id="password-confirm" className="mb-3">
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control
								type="password"
								ref={passwordConfirmRef}
								placeholder="Leave blank to keep the same"
							/>
						</Form.Group>
						<Button disabled={loading} className="w-100" type="submit">Update</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Link to="/">Cancel</Link>
			</div> */}

			<Card className={classes.card}>
				<div className={classes.boxVerticalCenter}>
					<h1 className={classes.title}>Update Profile</h1>
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
						label="New Password"
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
						label="Confirm New Password"
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
						Update
					</Button>
				</form>
			</Card>
			<div className={classes.boxHorizontalCenter}>
				<Link to="/">Cancel</Link>
			</div>
		</>
	);
}
