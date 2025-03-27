import { authClient } from '@/lib/auth-client';

export default function User() {
	const {
		data: session,
		isPending,
		error,
		refetch
	} = authClient.useSession();

	if (isPending) return <p>Загрузка...</p>;
	if (error) return <p>Ошибка: {error.message}</p>;

	return (
		<div>
			{session ? (
				<>
					<p>Вы вошли как: {session.user?.name}</p>
					<button onClick={() => refetch()}>Обновить сессию</button>
				</>
			) : (
				<p>Вы не авторизованы</p>
			)}
		</div>
	);
}
