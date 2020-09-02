import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvaiabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
	public async index(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { month, year } = request.body;
		const { provider_id } = request.params;

		const listProviderMonthAvaiability = container.resolve(
			ListProviderMonthAvaiabilityService,
		);

		const availability = await listProviderMonthAvaiability.execute({
			month,
			provider_id,
			year,
		});

		return response.json(availability);
	}
}
