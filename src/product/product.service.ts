import { Injectable, NotFoundException } from '@nestjs/common'
import { CategoryService } from '../category/category.service'
import { PrismaService } from '../prisma.service'
import { PaginationService } from '../pagination/pagination.service'
import {
	EnumProductSort,
	GetAllProductInput
} from './dto/get-all.product.input'
import {
	productReturn0bject,
	productReturn0bjectFullest
} from './return-product.object'
import { Prisma } from '@prisma/client'
import { convertToNumber } from '../utils/convert-to-number'
import { generateSlug } from '../utils/generate-slug'
import { CreateProductInput } from './dto/create-product.input'

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private paginotionService: PaginationService,
		private categoryService: CategoryService
	) {}

	async getAll(input: GetAllProductInput = {}) {
		const { perPage, skip } = this.paginotionService.getPagination(input)

		const filters = this.createFilter(input)

		const products = await this.prisma.product.findMany({
			where: filters,
			// orderBy: this.getSortOption(input.sort),
			skip,
			take: +perPage,
			select: productReturn0bject
		})
		return {
			products,
			length: await this.prisma.product.count({
				where: filters
			})
		}
	}

	private createFilter(dto: GetAllProductInput): Prisma.ProductWhereInput {
		const filters: Prisma.ProductWhereInput[] = []

		if (dto.searchTerm) filters.push(this.getSearchTermFilter(dto.searchTerm))

		if (dto.ratings)
			filters.push(
				this.getRatingFilter(dto.ratings.split('|').map(rating => +rating))
			)
		if (dto.minPrice || dto.maxPrice)
			filters.push(
				this.getPriceFilter(
					convertToNumber(dto.minPrice),
					convertToNumber(dto.maxPrice)
				)
			)

		if (dto.categoryId) filters.push(this.getCategoryFilter(+dto.categoryId))

		return filters.length ? { AND: filters } : {}
	}

	private getSortOption(
		sort: EnumProductSort
	): Prisma.ProductOrderByWithRelationInput[] {
		switch (sort) {
			case EnumProductSort.LOW_PRICE:
				return [{ price: 'asc' }]
			case EnumProductSort.HIGH_PRICE:
				return [{ price: 'desc' }]
			case EnumProductSort.OLDEST:
				return [{ createdAt: 'asc' }]
			default:
				return [{ createdAt: 'desc' }]
		}
	}

	private getSearchTermFilter(searchTerm: string): Prisma.ProductWhereInput {
		return {
			OR: [
				{
					category: {
						name: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				},
				{
					name: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				},
				{
					description: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				}
			]
		}
	}

	private getRatingFilter(ratings: number[]): Prisma.ProductWhereInput {
		return {
			reviews: {
				some: {
					rating: {
						in: ratings
					}
				}
			}
		}
	}

	private getPriceFilter(
		minPrice?: number,
		maxPrice?: number
	): Prisma.ProductWhereInput {
		let priceFilter: Prisma.IntFilter | undefined = undefined

		if (minPrice) {
			priceFilter = {
				...priceFilter,
				gte: minPrice
			}
		}
		if (maxPrice) {
			priceFilter = {
				...priceFilter,
				lte: maxPrice
			}
		}
		return {
			price: priceFilter
		}
	}

	private getCategoryFilter(categoryId: number): Prisma.ProductWhereInput {
		return {
			categoryId
		}
	}

	async byId(id: number) {
		const product = await this.prisma.product.findUnique({
			where: {
				id
			},
			select: productReturn0bjectFullest
		})
		if (!product) {
			throw new NotFoundException('product not found')
		}
		return product
	}
	async bySlug(slug: string) {
		const product = await this.prisma.product.findUnique({
			where: {
				slug
			},
			select: productReturn0bjectFullest
		})
		if (!product) {
			throw new NotFoundException('product not found')
		}
		return product
	}
	async byCategory(categorySlug: string) {
		const products = await this.prisma.product.findMany({
			where: {
				category: {
					slug: categorySlug
				}
			},
			select: productReturn0bjectFullest
		})
		if (!products) throw new NotFoundException('products not found')
		return products
	}

	async getSimilar(id: number) {
		const currentProduct = await this.byId(id)

		if (!currentProduct)
			throw new NotFoundException('Current product not found!')

		const products = await this.prisma.product.findMany({
			where: {
				category: {
					name: currentProduct.category.name
				},
				NOT: {
					id: currentProduct.id
				}
			},
			orderBy: {
				createdAt: 'desc'
			},
			select: productReturn0bject
		})
		return products
	}

	async create() {
		const product = await this.prisma.product.create({
			data: {
				description: '',
				name: '',
				price: 0,
				slug: ''
			}
		})
		return product.id
	}

	async update(id: number, input: CreateProductInput) {
		const { description, images, price, name, categoryId } = input

		await this.categoryService.byId(categoryId)

		return this.prisma.product.update({
			where: { id },
			data: {
				description,
				images,
				price,
				name,
				slug: generateSlug(input.name),
				category: {
					connect: {
						id: categoryId
					}
				}
			}
		})
	}

	async delete(id: number) {
		return this.prisma.product.delete({
			where: { id }
		})
	}
}
