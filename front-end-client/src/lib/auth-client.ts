import { createAuthClient } from 'better-auth/react';
import { passkeyClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
	baseURL: 'http://localhost:3005/api/auth',
	plugins: [passkeyClient()]
});

export const { signIn, signOut, signUp, useSession } = authClient;
