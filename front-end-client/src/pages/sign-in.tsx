'use client';

import { useState } from 'react';
import { authClient, signIn } from '../lib/auth-client';
import Link from 'next/link';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [serverResponse, setServerResponse] = useState<string | null>(null);

	const handleSignIn = async () => {
		setLoading(true);
		const response = await authClient.signIn.email({
			email,
			password,
			callbackURL: '/user-profile',
			fetchOptions: {
				onSuccess(ctx) {
					// const authToken =
					// 	ctx.response.headers.get('set-auth-token'); // get the token from the response headers
					// // Store the token securely (e.g., in localStorage)
					// if (authToken) {
					// 	localStorage.setItem('bearer_token', authToken);
					// }
					localStorage.setItem('user', JSON.stringify(ctx.data));
					setServerResponse(JSON.stringify(ctx.data));
					const token = fetch(
						'http://localhost:3005/api/auth/token',
						{
							method: 'POST',
							credentials: 'include'
						}
					).then((token) => {
						const jwt = token.headers.get('set-auth-jwt');
						console.log(jwt);
						if (!jwt) {
							setLoading(false);
						} else {
							localStorage.setItem('bearer', jwt);
						}
					});
					setLoading(false);
				},
				onError(ctx) {
					setServerResponse(
						`Ошибка: ${JSON.stringify(ctx.error.error)}`
					);
					setLoading(false);
				}
			}
		});

		// if (error) {
		// 	setServerResponse(`Ошибка: ${error}`);
		// 	setLoading(false);
		// }

		// setServerResponse(JSON.stringify(data));
	};

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

			<button type='submit' disabled={loading} onClick={handleSignIn}>
				{loading ? 'Loading...' : 'Login'}
			</button>

			{/* Показываем текущую сессию */}

			{/* Отображаем ответ сервера */}
			{serverResponse && (
				<pre style={{ background: '#f4f4f4', padding: '10px' }}>
					{serverResponse}
				</pre>
			)}
			<p>
				Powered by{' '}
				<Link href='https://better-auth.com'>better-auth</Link>
			</p>
		</div>
	);
}
