import { getMongoRepository, MongoRepository } from 'typeorm';
import ICreateNotificaitonDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
	private ormRepository: MongoRepository<Notification>;

	constructor() {
		this.ormRepository = getMongoRepository(Notification, 'mongo');
	}

	public async create({
		content,
		recipient_id,
	}: ICreateNotificaitonDTO): Promise<Notification> {
		const notification = this.ormRepository.create({
			recipient_id,
			content,
		});

		await this.ormRepository.save(notification);

		return notification;
	}
}

export default NotificationsRepository;
