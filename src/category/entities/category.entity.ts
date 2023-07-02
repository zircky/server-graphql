import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Product } from '../../product/entities/product.entity'

@ObjectType()
export class Category {
	@Field(type => Int)
	id: number

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date

	@Field()
	name: string

	@Field()
	slug: string

	@Field({ nullable: true })
	images?: string

	@Field(type => [Product])
	products: Product[]
}
