'use client';
import { authClient } from '@/lib/auth-client';
import { useState, useEffect } from 'react';
function User() {
	const [loading, setLoading] = useState(false);
	const { data: user, error, refetch } = authClient.useSession();
	const [message, setMessage] = useState<string | null>();

	useEffect(() => {
		if (error) {
			setMessage(JSON.stringify(error));
		} else if (user) {
			setMessage(JSON.stringify(user));
		}
	}, [user, error]);

	async function getSecret() {
		setLoading(true);
		refetch();
		setLoading(false);
	}

	return (
		<div>
			<button type='submit' disabled={loading} onClick={getSecret}>
				{loading ? 'Loading...' : 'GetSession'}
			</button>
			{message && (
				<pre style={{ background: '#f4f4f4', padding: '10px' }}>
					{message}
				</pre>
			)}
		</div>
	);
}
export { User as default };
