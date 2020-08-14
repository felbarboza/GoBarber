import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
	findByDate(date: Date): Promise<Appointment | undefined>;
	create(data: ICreateAppointmentDTO): Promise<Appointment>;
}
