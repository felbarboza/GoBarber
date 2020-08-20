import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeMailProvider = new FakeMailProvider();
		fakeUserTokensRepository = new FakeUserTokensRepository();

		sendForgotPasswordEmail = new SendForgotPasswordEmailService(
			fakeUsersRepository,
			fakeMailProvider,
			fakeUserTokensRepository,
		);
	});

	it('should be able to recover the passwprd using the email', async () => {
		await fakeUsersRepository.create({
			name: 'felipe',
			email: 'email@email.com',
			password: '123',
		});
		const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

		await sendForgotPasswordEmail.execute({
			email: 'email@email.com',
		});

		expect(sendMail).toHaveBeenCalled();
	});

	it('should not be able to recover a non-existing user password', async () => {
		await expect(
			sendForgotPasswordEmail.execute({
				email: 'email@email.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should generate a forgot password token', async () => {
		const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

		const user = await fakeUsersRepository.create({
			name: 'felipe',
			email: 'email@email.com',
			password: '123',
		});

		await sendForgotPasswordEmail.execute({
			email: 'email@email.com',
		});

		expect(generateToken).toHaveBeenCalledWith(user.id);
	});
});
