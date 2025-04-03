'use client';
import { useState } from 'react';
import { authClient, signIn } from '../lib/auth-client';

export default function SendOTP() {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [loading, setLoading] = useState(false);
	const [responseOTP, setResponseOTP] = useState(false);
	const [code, setCode] = useState('000000');
	const [serverResponse, setServerResponse] = useState<string | null>(null);
	const [serverResponseOTP, setServerResponseOTP] = useState<string | null>(
		null
	);

	const handleSignIn = async () => {
		setLoading(true);
		const response = await authClient.phoneNumber.sendOtp({
			phoneNumber,
			fetchOptions: {
				onSuccess(ctx) {
					// const authToken =
					// 	ctx.response.headers.get('set-auth-token'); // get the token from the response headers
					// // Store the token securely (e.g., in localStorage)
					// if (authToken) {
					// 	localStorage.setItem('bearer_token', authToken);
					// }

					// localStorage.setItem('user', JSON.stringify(ctx.data));
					setServerResponse(JSON.stringify(ctx.data));
					setResponseOTP(true);
				},
				onError(ctx) {
					// setServerResponse(
					// 	`Ошибка: ${JSON.stringify(ctx.error.error)}`
					// );
					setServerResponse(null);
				}
			}
		});
		setLoading(false);
	};
	const handleOTP = async () => {
		const response = await authClient.phoneNumber.verify({
			code,
			phoneNumber,
			fetchOptions: {
				onSuccess(ctx) {
					setServerResponseOTP(JSON.stringify(ctx.data));
				}
			}
		});
	};

	return (
		<div>
			<h2>Send OTP</h2>
			<p>Enter your phoneNumber below to login to your account</p>

			<label htmlFor='phoneNumber'>Phone</label>
			<input
				id='phoneNumber'
				type='phoneNumber'
				placeholder='+79000000000'
				required
				onChange={(e) => setPhoneNumber(e.target.value)}
				value={phoneNumber}
			/>
			<button type='submit' disabled={loading} onClick={handleSignIn}>
				{loading ? 'Loading...' : 'Login'}
			</button>

			{serverResponse && (
				<pre style={{ background: '#f4f4f4', padding: '10px' }}>
					{serverResponse}
				</pre>
			)}

			{responseOTP ? (
				<div>
					<label htmlFor='code'>code</label>
					<input
						id='code'
						type='code'
						placeholder='000000'
						required
						onChange={(e) => setCode(e.target.value)}
						value={code}
					/>
					<button
						type='submit'
						disabled={loading}
						onClick={handleOTP}>
						{loading ? 'Loading...' : 'Login'}
					</button>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
}
