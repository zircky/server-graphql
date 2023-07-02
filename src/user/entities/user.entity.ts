import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Order } from '../../order/entities/order.entity'
import { Product } from '../../product/entities/product.entity'
import { Review } from '../../review/entities/review.entity'

@ObjectType()
export class User {
	@Field(type => Int)
	id: number

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date

	@Field()
	email: string

	@Field()
	password: string

	@Field()
	isAdmin: boolean

	@Field()
	name: string

	@Field()
	avatarPath: string

	@Field()
	phone: string

	@Field(type => [Order])
	orders: Order[]

	@Field(type => [Product])
	favorites: Product[]

	@Field(type => [Review])
	reviews: Review[]
}
