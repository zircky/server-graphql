import { Field, InputType } from '@nestjs/graphql'
import { PaginationInput } from '../../pagination/pagination.input'
import { IsEnum, IsOptional, IsString } from 'class-validator'

export enum EnumProductSort {
	HIGH_PRICE = 'high-price',
	LOW_PRICE = 'low-price',
	NEWEST = 'newest',
	OLDEST = 'oldest'
}

@InputType()
export class GetAllProductInput extends PaginationInput {
	@Field(() => EnumProductSort)
	@IsOptional()
	@IsString()
	@IsEnum(EnumProductSort)
	// sort?: EnumProductSort
	@Field()
	@IsOptional()
	@IsString()
	searchTerm?: string

	@Field()
	@IsOptional()
	@IsString()
	ratings?: string

	@Field()
	@IsOptional()
	@IsString()
	minPrice?: string

	@Field()
	@IsOptional()
	@IsString()
	maxPrice?: string

	@Field()
	@IsOptional()
	@IsString()
	categoryId?: string
}
