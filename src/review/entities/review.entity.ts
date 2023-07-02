import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Product } from '../../product/entities/product.entity'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class Review {
	@Field(type => Int)
	id: number

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date

	@Field(type => Int)
	rating: number

	@Field()
	text: string

	@Field(type => Int)
	userId: number

	@Field(type => Int)
	productId: number

	@Field(type => Product)
	product: Product

	@Field(type => User)
	user: User
}
