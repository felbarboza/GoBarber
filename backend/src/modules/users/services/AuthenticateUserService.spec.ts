import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
	it('should be able to authenticate user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const authenticateUser = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const user = await createUser.execute({
			email: 'felipeab03@gmail.com',
			name: 'Felipe',
			password: '123',
		});

		const response = await authenticateUser.execute({
			email: 'felipeab03@gmail.com',
			password: '123',
		});

		expect(response).toHaveProperty('token');
		expect(response.user).toEqual(user);
	});

	it('should not be able to authenticate with non existing user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const authenticateUser = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		expect(
			authenticateUser.execute({
				email: 'felipeab03@gmail.com',
				password: '123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to authenticate with wrong password', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const authenticateUser = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		await createUser.execute({
			email: 'felipeab03@gmail.com',
			name: 'Felipe',
			password: '123',
		});

		expect(
			authenticateUser.execute({
				email: 'felipeab03@gmail.com',
				password: '456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
