import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { HttpCode, UsePipes, ValidationPipe } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { Auth } from '../auth/decorators/auth.decorator'

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => User)
	async getAll() {
		return this.userService.getAll()
	}

	@Query(() => User)
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id)
	}

	@Mutation(() => User)
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	async updateProfile(
		@CurrentUser('id') id: number,
		@Args('input') input: CreateUserInput
	) {
		return this.userService.updateProfile(id, input)
	}

	@Mutation(() => User)
	@HttpCode(200)
	@Auth()
	async toggleFavorite(
		@CurrentUser('id') id: number,
		@Args('productId') productId: string
	) {
		return this.userService.toggleFavorite(id, +productId)
	}
}
