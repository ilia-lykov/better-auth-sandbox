'use client';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';

export default function UserToken() {
	// const session = authClient.useSession();
	const [loading, setLoading] = useState(false);
	const [serverResponse, setServerResponse] = useState<string | null>(null);

	const handleGetToken = async () => {
		// console.log(session);
		setLoading(true);
		const token = await fetch('http://localhost:3005/api/auth/token', {
			method: 'POST',
			credentials: 'include'
		}).then((token) => {
			const jwt = token.headers.get('set-auth-jwt');
			console.log(jwt);
			if (!jwt) {
				setLoading(false);
			} else {
				localStorage.setItem('bearer', jwt);
			}
		});

		// await authClient
		// 	.getSession({
		// 		fetchOptions: {
		// 			onSuccess: (ctx) => {
		// 				const jwt = ctx.response.headers.get('set-auth-jwt');
		// 				console.log(jwt);
		// 			}
		// 		}
		// 	})
		// 	.then((data) => console.log(data));
		setLoading(false);
	};

	return (
		<div>
			<button type='submit' disabled={loading} onClick={handleGetToken}>
				{loading ? 'Loading...' : 'Login'}
			</button>
			{serverResponse && (
				<pre style={{ background: '#f4f4f4', padding: '10px' }}>
					{serverResponse}
				</pre>
			)}
		</div>
	);
}
