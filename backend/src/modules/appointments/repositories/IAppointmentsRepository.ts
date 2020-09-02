import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';

export default interface IAppointmentsRepository {
	findByDate(date: Date): Promise<Appointment | undefined>;
	findAllInMonthFromProvider(
		data: IFindAllInMonthFromProviderDTO,
	): Promise<Appointment[]>;
	create(data: ICreateAppointmentDTO): Promise<Appointment>;
}
