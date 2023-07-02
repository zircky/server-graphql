import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Product } from '../../../product/entities/product.entity'
import { Order } from '../../entities/order.entity'

@ObjectType()
export class OrderItem {
	@Field(type => Int)
	id: number

	@Field()
	createdAt: Date

	@Field()
	updatedAt: Date

	@Field(type => Int)
	quantity: number

	@Field(type => Int)
	price: number

	@Field(type => Int, { nullable: true })
	orderId?: number

	@Field(type => Int)
	productId: number

	@Field(type => Order, { nullable: true })
	order?: Order

	@Field(type => Product)
	product: Product
}
