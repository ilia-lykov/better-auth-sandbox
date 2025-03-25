'use client';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function SignUpPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSignUp = async () => {
		setLoading(true);
		setError('');

		const { error } = await authClient.signUp.email(
			{
				email,
				password,
				name
			},
			{
				onRequest: () => console.log('Signing up...'),
				onSuccess: () => {},
				onError: (ctx) => setError(ctx.error.message)
			}
		);

		setLoading(false);
	};

	return (
		<div>
			<h1>Sign Up</h1>
			<input
				type='text'
				placeholder='Name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				type='email'
				placeholder='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleSignUp} disabled={loading}>
				{loading ? 'Signing up...' : 'Sign Up'}
			</button>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	);
}
