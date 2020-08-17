import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
	it('should be able to create a new user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();
		const createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const user = await createUser.execute({
			email: 'felipeab03@gmail.com',
			name: 'Felipe',
			password: '123',
		});

		expect(user).toHaveProperty('id');
		expect(user.email).toBe('felipeab03@gmail.com');
	});

	it('should not be able to create a new user with the same email of another', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();
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
			createUser.execute({
				email: 'felipeab03@gmail.com',
				name: 'Felipe',
				password: '123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
