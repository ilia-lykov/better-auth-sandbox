import { createAuthClient } from 'better-auth/react';
import { jwtClient, phoneNumberClient } from 'better-auth/client/plugins';

let authToken;
export const authClient = createAuthClient({
	baseURL: 'http://localhost:3005/api/auth',
	plugins: [jwtClient(), phoneNumberClient()]
	// fetchOptions: {
	// 	auth: {
	// 		type: 'Bearer',
	// 		token: () => localStorage.getItem('bearer_token') || ''
	// 	},
	// 	onSuccess: (ctx) => {
	// 		const authToken = ctx.response.headers.get('set-auth-token');
	// 		// Store the token securely (e.g., in localStorage)
	// 		if (authToken) {
	// 			localStorage.setItem('bearer_token', authToken);
	// 		}
	// 	}
	// }
});

export const { signIn, signOut, signUp, useSession } = authClient;
