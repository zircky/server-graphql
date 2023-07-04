import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ProductService } from './product.service'
import { Product } from './entities/product.entity'
import { HttpCode, UsePipes, ValidationPipe } from '@nestjs/common'
import { CreateProductInput } from './dto/create-product.input'
import { Auth } from '../auth/decorators/auth.decorator'
import { GetAllProductInput } from './dto/get-all.product.input'

@Resolver(() => Product)
export class ProductResolver {
	constructor(private readonly productService: ProductService) {}

	@UsePipes(new ValidationPipe())
	@Query(() => [Product])
	async getAll(@Args('queryDto') queryDto: GetAllProductInput) {
		return this.productService.getAll(queryDto)
	}

	@Query(() => Product)
	async getSimilar(@Args('id') id: string) {
		return this.productService.getSimilar(+id)
	}

	@Query(() => Product)
	async getProductBySlug(@Args('slug') slug: string) {
		return this.productService.bySlug(slug)
	}

	@Query(() => Product)
	async getProductByCategory(@Args('categorySlug') categorySlug: string) {
		return this.productService.byCategory(categorySlug)
	}

	@Mutation(() => Product)
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	async createProduct() {
		return this.productService.create()
	}

	@Mutation(() => Product)
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	async updateProduct(
		@Args('id') id: string,
		@Args('input') input: CreateProductInput
	) {
		return this.productService.update(+id, input)
	}

	@Mutation(() => Product)
	@HttpCode(200)
	@Auth('admin')
	async deleteProduct(@Args('id') id: string) {
		return this.productService.delete(+id)
	}

	@Query(() => Product)
	@Auth('admin')
	async getProduct(@Args('id') id: string) {
		return this.productService.byId(+id)
	}
}
