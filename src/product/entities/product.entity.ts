import { Field, Int, ObjectType } from '@nestjs/graphql'
import { OrderItem } from '../../order/orderitem/entities/orderitem.entity'
import { Category } from '../../category/entities/category.entity'
import { User } from '../../user/entities/user.entity'
import { Review } from '../../review/entities/review.entity'

@ObjectType()
export class Product {
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

	@Field()
	description: string

	@Field(type => Int)
	price: number

	@Field(type => [String])
	images: string[]

	@Field(type => Int, { nullable: true })
	categoryId?: number

	@Field(type => Int, { nullable: true })
	userId?: number

	@Field(type => [OrderItem])
	orderItems: OrderItem[]

	@Field(type => Category, { nullable: true })
	category?: Category

	@Field(type => User, { nullable: true })
	user?: User

	@Field(type => [Review])
	reviews: Review[]
}
