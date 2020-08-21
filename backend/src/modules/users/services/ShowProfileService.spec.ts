import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		showProfile = new ShowProfileService(fakeUsersRepository);
	});
	it('should be able to show the profile', async () => {
		const user = await fakeUsersRepository.create({
			name: 'felipe',
			email: 'email@email.com',
			password: '123',
		});

		const shownProfile = await showProfile.execute({ user_id: user.id });

		expect(shownProfile.name).toBe('felipe');
		expect(shownProfile.email).toBe('email@email.com');
	});

	it('should not be able to show the profile from non-existing user', async () => {
		await expect(
			showProfile.execute({ user_id: 'non-existing-user_id' }),
		).rejects.toBeInstanceOf(AppError);
	});
});
