'use client';
import { authClient } from '@/lib/auth-client';

function User() {
	const session = authClient.useSession();
	console.log(session);
	return (
		<div>
			<p>Вы не авторизованы</p>
		</div>
	);
}
export { User as default };
