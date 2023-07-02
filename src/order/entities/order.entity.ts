import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from '../../user/entities/user.entity'
import { OrderItem } from '../orderitem/entities/orderitem.entity'

// enum EnumOrderStatus {
// 	PENDING = 'PENDING',
// 	PAYED = 'PAYED',
// 	SHIPPED = 'SHIPPED',
// 	DELIVERED = 'DELIVERED'
// }

@ObjectType()
export class Order {
	@Field(type => Int)
	id: number

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date

	@Field()
	status: string

	@Field(type => Int)
	total: number

	@Field(type => Int)
	userId: number

	@Field(type => User)
	user: User

	@Field(type => [OrderItem])
	items: OrderItem[]
}
