import { Injectable } from '@nestjs/common'
import { PaginationInput } from './pagination.input'

@Injectable()
export class PaginationService {
	getPagination(input: PaginationInput, defaultPerPage = 30) {
		const page = input.page ? input.page : 1
		const perPage = input.pagePage ? input.pagePage : defaultPerPage

		const skip = (+page - 1) * +perPage
		return { perPage, skip }
	}
}
