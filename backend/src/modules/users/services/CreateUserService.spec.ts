import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();
		fakeCacheProvider = new FakeCacheProvider();
		createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
			fakeCacheProvider,
		);
	});
	it('should be able to create a new user', async () => {
		const user = await createUser.execute({
			email: 'felipeab03@gmail.com',
			name: 'Felipe',
			password: '123',
		});

		expect(user).toHaveProperty('id');
		expect(user.email).toBe('felipeab03@gmail.com');
	});

	it('should not be able to create a new user with the same email of another', async () => {
		await createUser.execute({
			email: 'felipeab03@gmail.com',
			name: 'Felipe',
			password: '123',
		});

		await expect(
			createUser.execute({
				email: 'felipeab03@gmail.com',
				name: 'Felipe',
				password: '123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
