import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { returnCategoryObject } from './return-category.object'
import { CreateCategoryInput } from './dto/create-category.input'
import { generateSlug } from '../utils/generate-slug'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async byId(id: number) {
		const category = await this.prisma.category.findUnique({
			where: { id },
			select: returnCategoryObject
		})
		if (!category) {
			throw new NotFoundException(`Category with id ${id} not found`)
		}
		return category
	}

	async bySlug(slug: string) {
		const category = await this.prisma.category.findUnique({
			where: { slug },
			select: returnCategoryObject
		})
		if (!category) {
			throw new NotFoundException(`Category with slug ${slug} not found`)
		}
		return category
	}

	async getAll() {
		return this.prisma.category.findMany({ select: returnCategoryObject })
	}

	async create() {
		return this.prisma.category.create({
			data: {
				name: '',
				slug: ''
			}
		})
	}

	async update(id: number, input: CreateCategoryInput) {
		return this.prisma.category.update({
			where: { id },
			data: {
				name: input.name,
				slug: generateSlug(input.name)
			}
		})
	}

	async delete(id: number) {
		return this.prisma.category.delete({
			where: { id }
		})
	}
}
