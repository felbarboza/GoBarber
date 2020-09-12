import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
	public async index(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { month, year, day } = request.query;
		const { provider_id } = request.params;

		const listProviderDayAvaiability = container.resolve(
			ListProviderDayAvailabilityService,
		);

		const availability = await listProviderDayAvaiability.execute({
			day: Number(day),
			month: Number(month),
			provider_id,
			year: Number(year),
		});

		return response.json(availability);
	}
}
