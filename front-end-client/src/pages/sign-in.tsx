'use client';

import { useState } from 'react';
import { signIn } from '../lib/auth-client';
import Link from 'next/link';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);

	return (
		<div>
			<h2>Sign In</h2>
			<p>Enter your email below to login to your account</p>

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
				placeholder='password'
				autoComplete='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<label>
				<input
					type='checkbox'
					checked={rememberMe}
					onChange={() => setRememberMe(!rememberMe)}
				/>
				Remember me
			</label>

			<button
				type='submit'
				disabled={loading}
				onClick={async () => {
					await signIn.email({ email, password });
				}}>
				{loading ? 'Loading...' : 'Login'}
			</button>

			<button
				onClick={async () => {
					await signIn.passkey();
				}}>
				Sign-in with Passkey
			</button>

			<p>
				Powered by{' '}
				<Link href='https://better-auth.com'>better-auth</Link>
			</p>
		</div>
	);
}
