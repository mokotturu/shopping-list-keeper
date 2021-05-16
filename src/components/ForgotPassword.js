import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

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
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Reset Password</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					{message && <Alert variant="success">{message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email" className="mb-3">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} placeholder="Enter email" required />
						</Form.Group>
						<Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Link to="/login">Log in instead</Link>
			</div>
		</>
	);
}
