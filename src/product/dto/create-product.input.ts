import { Field, InputType } from '@nestjs/graphql'
import { ArrayMinSize, IsNumber, IsOptional, IsString } from 'class-validator'
import { Prisma } from '@prisma/client'

@InputType()
export class CreateProductInput implements Prisma.ProductUpdateInput {
	@Field()
	@IsString()
	name: string

	@Field()
	@IsNumber()
	price: number

	@Field()
	@IsOptional()
	@IsString()
	description?: string

	@Field()
	@IsString({ each: true })
	@ArrayMinSize(1)
	images: string

	@Field()
	@IsNumber()
	categoryId: number
}
