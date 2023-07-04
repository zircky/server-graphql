import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CategoryService } from './category.service'
import { Category } from './entities/category.entity'
import { Auth } from '../auth/decorators/auth.decorator'
import { HttpCode, UsePipes, ValidationPipe } from '@nestjs/common'
import { CreateCategoryInput } from './dto/create-category.input'

@Resolver(() => Category)
export class CategoryResolver {
	constructor(private readonly categoryService: CategoryService) {}
	@Query(() => [Category], { name: 'category' })
	async getAll() {
		return this.categoryService.getAll()
	}

	@Query(() => Category, { name: 'category' })
	async getBySlug(@Args('slug') slug: string) {
		return this.categoryService.bySlug(slug)
	}

	@Query(() => Category, { name: 'category' })
	@Auth()
	async getById(@Args('id', { type: () => Int }) id: number) {
		return this.categoryService.byId(id)
	}

	@HttpCode(200)
	@Mutation(() => Category)
	@Auth('admin')
	async create() {
		return this.categoryService.create()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Mutation(() => Category)
	@Auth('admin')
	async update(
		@Args('id') id: number,
		@Args('input') input: CreateCategoryInput
	) {
		return this.categoryService.update(id, input)
	}

	@Mutation(() => Category)
	async delete(@Args('id', { type: () => Int }) id: string) {
		return this.categoryService.delete(+id)
	}
}
