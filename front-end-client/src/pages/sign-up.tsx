'use client';

import { useState } from 'react';
import { signUp } from '../lib/auth-client';
import { useRouter } from 'next/navigation';

function SignUp() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	return (
		<div>
			<h2>Sign Up</h2>
			<p>Enter your information to create an account</p>

			<label htmlFor='first-name'>First name</label>
			<input
				id='first-name'
				placeholder='Max'
				required
				onChange={(e) => setFirstName(e.target.value)}
				value={firstName}
			/>

			<label htmlFor='last-name'>Last name</label>
			<input
				id='last-name'
				placeholder='Robinson'
				required
				onChange={(e) => setLastName(e.target.value)}
				value={lastName}
			/>

			<label htmlFor='email'>Email</label>
			<input
				id='email'
				type='email'
				placeholder='m@example.com'
				required
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>

			<label htmlFor='password'>Password</label>
			<input
				id='password'
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				autoComplete='new-password'
				placeholder='Password'
			/>

			<label htmlFor='password-confirmation'>Confirm Password</label>
			<input
				id='password-confirmation'
				type='password'
				value={passwordConfirmation}
				onChange={(e) => setPasswordConfirmation(e.target.value)}
				autoComplete='new-password'
				placeholder='Confirm Password'
			/>

			<button
				type='submit'
				disabled={loading}
				onClick={async () => {
					setLoading(true);
					await signUp.email({
						email,
						password,
						name: `${firstName} ${lastName}`
					});
					setLoading(false);
				}}>
				{loading ? 'Loading...' : 'Create an account'}
			</button>
		</div>
	);
}

export { SignUp as default };
