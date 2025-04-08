'use client';

import { useState } from 'react';
import { signUp } from '../lib/auth-client';
import { useRouter } from 'next/router';

function SignUp() {
	const [firstName, setFirstName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [loading, setLoading] = useState(false);
	const [serverResponse, setServerResponse] = useState<string | null>(null);
	const router = useRouter();

	return (
		<div>
			<h2>Sign Up</h2>

			<div>
				<p>Enter your information to create an account</p>

				<label htmlFor='first-name'>First name</label>
				<input
					id='first-name'
					placeholder='Max'
					required
					onChange={(e) => setFirstName(e.target.value)}
					value={firstName}
				/>
			</div>
			<div>
				<label htmlFor='last-name'>Last name</label>
				<input
					id='last-name'
					placeholder='Robinson'
					required
					onChange={(e) => setLastName(e.target.value)}
					value={lastName}
				/>
			</div>
			<div>
				<label htmlFor='email'>Email</label>
				<input
					id='email'
					type='email'
					placeholder='m@example.com'
					required
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
			</div>
			<div>
				<label htmlFor='phoneNumber'>phoneNumber</label>
				<input
					id='phoneNumber'
					type='phoneNumber'
					placeholder='+79000000000'
					required
					onChange={(e) => setPhoneNumber(e.target.value)}
					value={phoneNumber}
				/>
			</div>
			<div>
				<label htmlFor='password'>Password</label>
				<input
					id='password'
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					autoComplete='new-password'
					placeholder='Password'
				/>
			</div>
			<div>
				<label htmlFor='password-confirmation'>Confirm Password</label>
				<input
					id='password-confirmation'
					type='password'
					value={passwordConfirmation}
					onChange={(e) => setPasswordConfirmation(e.target.value)}
					autoComplete='new-password'
					placeholder='Confirm Password'
				/>
			</div>
			<div>
				<button
					type='submit'
					disabled={loading}
					onClick={async () => {
						setLoading(true);
						await signUp.email({
							email,
							password,
							name: `${firstName} ${lastName}`,
							phoneNumber,
							fetchOptions: {
								onSuccess(ctx) {
									router.push('/sign-in');
								},
								onError(ctx) {
									setServerResponse(
										JSON.stringify(ctx.error)
									);
								}
							}
						});
						setLoading(false);
					}}>
					Submit
				</button>
			</div>
			{loading ? 'Loading...' : 'Create an account'}
			{serverResponse}
		</div>
	);
}

export { SignUp as default };
