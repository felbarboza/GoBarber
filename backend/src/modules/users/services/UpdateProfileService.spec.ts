import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();

		updateProfile = new UpdateProfileService(
			fakeUsersRepository,
			fakeHashProvider,
		);
	});
	it('should be able to update profile', async () => {
		const user = await fakeUsersRepository.create({
			name: 'felipe',
			email: 'email@email.com',
			password: '123',
		});

		const updatedUser = await updateProfile.execute({
			user_id: user.id,
			name: 'Felipao',
			email: 'email2@mail.com',
		});

		expect(updatedUser.name).toBe('Felipao');
		expect(updatedUser.email).toBe('email2@mail.com');
	});

	it('should not be able to update the profile from non-existing user', async () => {
		await expect(
			updateProfile.execute({
				user_id: 'non-existing-user_id',
				name: 'Test',
				email: 'email@email.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to change to another user email', async () => {
		await fakeUsersRepository.create({
			name: 'felipe',
			email: 'email@email.com',
			password: '123',
		});

		const user = await fakeUsersRepository.create({
			name: 'teste',
			email: 'teste@email.com',
			password: '123',
		});

		await expect(
			updateProfile.execute({
				user_id: user.id,
				name: 'Felipao',
				email: 'email@email.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should be able to update the password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'teste',
			email: 'teste@email.com',
			password: '123',
		});

		const updatedUser = await updateProfile.execute({
			user_id: user.id,
			name: 'Felipao',
			email: 'email@email.com',
			old_password: '123',
			password: '123123',
		});

		expect(updatedUser.password).toBe('123123');
	});

	it('should not be able to update the password without old password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'teste',
			email: 'teste@email.com',
			password: '123',
		});

		await expect(
			updateProfile.execute({
				user_id: user.id,
				name: 'Felipao',
				email: 'email@email.com',
				password: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to update the password with wrong old password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'teste',
			email: 'teste@email.com',
			password: '123',
		});

		await expect(
			updateProfile.execute({
				user_id: user.id,
				name: 'Felipao',
				email: 'email@email.com',
				old_password: 'wrong_old_password',
				password: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
