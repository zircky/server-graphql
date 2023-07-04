import { returnCategoryObject } from '../category/return-category.object'
import { Prisma } from '@prisma/client'
import { returnReviewObject } from '../review/return-review.object'

export const productReturn0bject: Prisma.ProductSelect = {
	images: true,
	description: true,
	id: true,
	name: true,
	price: true,
	createdAt: true,
	slug: true,
	category: { select: returnCategoryObject },
	reviews: {
		select: returnReviewObject,
		orderBy: {
			createdAt: 'desc'
		}
	}
}
export const productReturn0bjectFullest: Prisma.ProductSelect = {
	...productReturn0bject
}
