import { IsOptional, IsString } from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PaginationInput {
	@Field()
	@IsOptional()
	@IsString()
	page?: string

	@Field()
	@IsOptional()
	@IsString()
	pagePage?: string
}
