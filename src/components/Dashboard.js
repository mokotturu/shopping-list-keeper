import React, { useState } from 'react';
import { Button, Card, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
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

export default function Dashboard() {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const history = useHistory();
	const classes = useStyles();

	async function handleLogOut() {
		setError("");

		try {
			await logout();
			history.push("/login");
		} catch {
			setError("Failed to log out.");
		}
	}

	return (
		<>
			<Card className={classes.card}>
				<div class={classes.boxVerticalCenter}>
					<h1 className={classes.title}>Profile</h1>
				</div>
				{error && <Alert severity="error">{error}</Alert>}
				<strong>Email:</strong> {currentUser.email}
				<div className={classes.boxVerticalCenter}>
					<Link to="/update-profile">Update profile</Link>
				</div>
			</Card>
			<Button
				className="button"
				variant="contained"
				color="primary"
				onClick={handleLogOut}
				fullWidth
			>
				Log out
			</Button>
		</>
	);
}
